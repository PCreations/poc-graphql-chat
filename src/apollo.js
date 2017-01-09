import ApolloClient from 'apollo-client'
import { createLocalInterface } from 'apollo-local-query'
import schema from './schema'
const graphql = require('graphql')

console.log('graphql', graphql, 'schema', schema)

const client = new ApolloClient({
  networkInterface: createLocalInterface(graphql, schema),
  ssrMode: true,
  dataIdFromObject: o => o.id
})

export default client
