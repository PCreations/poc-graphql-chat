import React, { Component } from 'react'
import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import {
  query as MESSAGES_QUERY,
  Provider as MessagesProvider
} from './graphql/allMessages'
import ChatBox from './ChatBox'
import ChatMessage from './ChatMessage'
import logo from './logo.svg'
import './App.css'

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
