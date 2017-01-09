import React from 'react'
import gql from 'graphql-tag'

import User from './User'

const ChatMessage = ({
  user,
  formattedDate,
  content
}) => {
  return (
    <div>
      <User {...user}/>
      <i>{formattedDate}</i>
      {` : ${content}`}
    </div>
  )
}

ChatMessage.fragments = {
  message: gql`
    fragment ChatMessage on Message {
      id
      formattedDate
      content
      user {
        ...ChatUser
      }
    }
    ${User.fragments.user}
  `
}

ChatMessage.propTypes = {
  id: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape(User.propTypes).isRequired,
  formattedDate: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired
}

export default ChatMessage
