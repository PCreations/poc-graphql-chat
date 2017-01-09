import React from 'react'

import ChatMessage from './ChatMessage'
import MessageInput from './MessageInput'


const ChatBox = ({ messages = [] }) => {
  return (
    <ul>
      {messages.map(m => {
        return (
          <li key={m.id}>
            <strong>{m.user.displayName}</strong>
            <i>{m.formattedDate}</i>
            ` : ${m.content}`
          </li>
        )
      })}
      <MessageInput/>
    </ul>
  )
}

ChatBox.PropTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.shape(ChatMessage.propTypes)).isRequired
}

export default ChatBox
