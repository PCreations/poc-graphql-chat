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
} from 'graphql';

import uuidV1 from 'uuid/v1'


let comments = {
  '6c84fb90-12c4-11e1-840d-7b25c5ee775a': {
    id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
    createdAt: + new Date(),
    content: 'First chat message ever !',
    user: {
      id: 'foobar',
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
    user: { type: User }
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
        return Promise.resolve()
          .then(() => {
            return Object.values(comments)  // TODO
          })
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
        return Promise.resolve()
          .then(() => {
            const comment = {
              id: uuidV1(),
              createdAt: + new Date(),
              content: input.content,
              user: {
                displayName: 'FooBar'
              }
            }
            comments[comment.id] = comment
            return comment
          })
      }
    }
  })
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
