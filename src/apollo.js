import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { createLocalInterface } from 'apollo-local-query'
const graphql = require('graphql')

import schema from './api/schema'
import app from './app'

const context = {
  userModel: app.models.user,
  messageModel: app.models.message
}

const client = new ApolloClient({
  networkInterface: createLocalInterface(graphql, schema, { context }),
  ssrMode: false,
  dataIdFromObject: o => o.id
})

export default client
