import React from 'react'

import ChatMessage from './ChatMessage'
import MessageInput from './MessageInput'


const ChatBox = ({ messages = [], submitMessage }) => {
  return (
    <ul>
      {messages.map(m => {
        return (
          <li key={m.id}>
            <ChatMessage {...m}/>
          </li>
        )
      })}
      <MessageInput onSubmit={submitMessage}/>
    </ul>
  )
}

ChatBox.PropTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.shape(ChatMessage.propTypes)).isRequired,
  submitMessage: React.PropTypes.func.isRequired
}

export default ChatBox
