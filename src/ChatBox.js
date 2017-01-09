import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { AUTH_USER_ID } from './constants'
import ChatMessage from './ChatMessage'
import MessageInput from './MessageInput'

const SUBMIT_MESSAGE = gql`
  mutation newMessage($input: MessageInput!) {
    newMessage(input: $input) {
      ...ChatMessage
    }
  },
  ${ChatMessage.fragments.message}
`

const SubmitMessageProvider = graphql(SUBMIT_MESSAGE, {
  props: ({ ownProps, mutate }) => ({
    submitMessage: ({ content, userId }) => mutate({
      variables: { input: { content, userId } },
      optimisticResponse: {
        __typename: 'Mutation',
        newMessage: {
          __typename: 'Message',
          createdAt: (+ new Date()).toString(),
          content,
          userId
        }
      },
      updateQueries: {
        AllMessages: (prev, { mutationResult }) => {
          const newMessage = mutationResult.data.newMessage;
          return {
            ...prev,
            messages: [
              ...prev.messages,
              newMessage
            ]
          }
        }
      }
    }),
    children: ownProps.children
  })
})(({ children, submitMessage }) => children({ submitMessage }))


class ChatBox extends React.Component {
  static defaultProps = {
    messages: []
  }
  static propTypes = {
    messages: React.PropTypes.arrayOf(React.PropTypes.shape(ChatMessage.propTypes)).isRequired
  }
  constructor() {
    super(...arguments)
    this.state = {
      message: ""
    }
    this.onInputChanged = this.onInputChanged.bind(this)
  }
  onInputChanged(value) {
    this.setState({
      message: value
    })
  }
  render() {
    const { messages } = this.props
    return (
      <ul>
        {messages.map(m => {
          return (
            <li key={m.id}>
              <ChatMessage {...m}/>
            </li>
          )
        })}
        <SubmitMessageProvider>
          {({ submitMessage }) => {
            return (
              <MessageInput
                message={this.state.message}
                onChange={this.onInputChanged}
                onSubmit={() => submitMessage({
                  content: this.state.message,
                  userId: AUTH_USER_ID
                })}
              />
            )
          }}
        </SubmitMessageProvider>
      </ul>
    )
  }
}

export default ChatBox
