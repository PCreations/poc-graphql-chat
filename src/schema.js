import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInterfaceType
} from 'graphql';


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
    createdAt: { type: GraphQLInt },  // timestamp
    content: { type: GraphQLString },
    user: { type: User }
  })
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    messages: {
      type: new GraphQLList(Message),
      resolve: () => {
        return []  // TODO
      }
    }
  })
})

const Schema = new GraphQLSchema({
  query: Query,
  //mutation: Mutation
});

export default Schema;
