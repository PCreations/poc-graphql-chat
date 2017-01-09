import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInterfaceType
} from 'graphql'
import * as firebase from 'firebase'
import uuidV1 from 'uuid/v1'
import {
  AUTH_USER_ID,
  FIREBASE_API_KEY,
  FIREBASE_ID,
  FIREBASE_DATABASE_NAME,
  FIREBASE_STORAGE_BUCKET_NAME
} from './constants'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: `https://${FIREBASE_ID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE_DATABASE_NAME}.firebaseio.com`,
  storageBucket: `${FIREBASE_STORAGE_BUCKET_NAME}.appspot.com`
}

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

const messagesRef = database.ref('/messages/graphql')
const getUser = id => database.ref(`/users/${id}`).once('value').then(snapshot => snapshot.val())

let comments = {
  '6c84fb90-12c4-11e1-840d-7b25c5ee775a': {
    id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
    createdAt: + new Date(),
    content: 'First chat message ever !',
    user: {
      id: AUTH_USER_ID,
      displayName: 'FooBar'
    }
  }
}

const User = new GraphQLObjectType({
  name: 'User',
  description: 'A chat user',
  fields: () => ({
    id: { type: GraphQLString },
    displayName: { type: GraphQLString }
  })
})

const Message = new GraphQLObjectType({
  name: 'Message',
  description: 'A chat message',
  fields: () => ({
    id: { type: GraphQLString },
    createdAt: { type: GraphQLString, description: 'timestamp string to avoid coercing issue' },  // timestamp
    formattedDate: { type: GraphQLString, resolve: root => root.createdAt },
    content: { type: GraphQLString },
    user: { type: User, resolve: message => {
      console.log("userId", message.user)
      return getUser(message.user)
        .then(user => ({
          id: message.user,
          displayName: `${user.name.first} ${user.name.last}`
        }))
    }}
  })
})

const MessageInput = new GraphQLInputObjectType({
  name: 'MessageInput',
  description: 'A message input from chat',
  fields: () => ({
    content: { type: GraphQLString },
    userId: { type: GraphQLString }
  })
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    messages: {
      type: new GraphQLList(Message),
      resolve: () => {
        return messagesRef.once('value').then(snapshot => {
          console.log("messages", Object.values(snapshot.val() || {}))
          return Object.values(snapshot.val() || {}).sort((a, b) => a.createdAt - b.createdAt)
        })
        /*return Promise.resolve()
          .then(() => {
            return Object.values(comments)  // TODO
          })*/
      }
    }
  })
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    newMessage: {
      type: Message,
      args: {
        input: { type: MessageInput }
      },
      resolve: (root, { input }) => {
        const id = database.ref().child(`users/${AUTH_USER_ID}/messages`).push().key
        const comment = {
          id,
          createdAt: + new Date(),
          content: input.content,
          user: AUTH_USER_ID
        }
        const updates = {}
        updates[`messages/graphql/${id}`] = {
          ...comment
        }
        return database.ref().update(updates)
          .then(() => ({
            ...comment,
            user: AUTH_USER_ID,
          }))
        /*return Promise.resolve()
          .then(() => {
            const comment = {
              id: uuidV1(),
              createdAt: + new Date(),
              content: input.content,
              user: {
                id: AUTH_USER_ID,
                displayName: 'FooBar'
              }
            }
            comments[comment.id] = comment
            return comment
          })*/
      }
    }
  })
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
