import React, { Component } from 'react'
import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ChatBox from './ChatBox'
import ChatMessage from './ChatMessage'
import logo from './logo.svg'
import './App.css'

const MESSAGES_QUERY = gql`
  query AllMessages {
    messages {
      ...ChatMessage
    }
  },
  ${ChatMessage.fragments.message}
`

const MessagesProvider = graphql(MESSAGES_QUERY, {
  props: ({ ownProps: { children }, data }) => {
    return {
      loading: data.loading,
      messages: data.messages || [],
      children
    }
  }
})(({ children, loading, messages }) => children({ loading, messages }))
/*const graphQLFetcher = graphQLParams => {
  return fetch(window.location.origin + '/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <div style={{ width: '500px', margin: 'auto' }}>
            <MessagesProvider>
              {({ loading, messages }) => {
                return loading ? (
                  <p>Loading...</p>
                ) : (
                  <ChatBox messages={messages}/>
                )
              }}
            </MessagesProvider>
          </div>
        </div>
      </div>
    )
  }
}

export default App
