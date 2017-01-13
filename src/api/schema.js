import { makeExecutableSchema } from 'graphql-tools'

const schema = [`
  # A chat user
  type User {
    id: String!,
    displayName: String!
  }

  # A chat message
  type Message {
    id: String!,
    createdAt: String!,
    formattedDate: String!,
    content: String!,
    user: User!
  }

  # A chat message input
  input MessageInput {
    content: String!,
    userId: String!
  }

  type Query {
    messages: [Message]!
  }

  type Mutation {
    newMessage(
      input: MessageInput!
    ): Message
  }

  type Subscription {
    messageAdded: Message!
  }
`]

const resolvers = {
  Message: {
    formattedDate({ createdAt }) {
      return createdAt
    },
    user({ userId }, args, context) {
      return context.userModel.getById(userId)
        .then(user => user && ({
          id: userId,
          displayName: `${user.name.first} ${user.name.last}`
        }))
    }
  },
  Query: {
    messages(root, args, context) {
      return context.messageModel.getAll()
        .then(messages => {
          return Object.values(messages || {}).sort((a, b) => a.createdAt - b.createdAt)
        })
    }
  },
  Mutation: {
    newMessage(root, { input }, context) {
      return context.messageModel
        .add(input.content, input.userId)
        .then(id => context.messageModel.getById(id))
        .then(message => {
          return message
        })
    }
  }
}

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})

export default executableSchema
