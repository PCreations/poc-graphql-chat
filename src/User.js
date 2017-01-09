import React from 'react'
import gql from 'graphql-tag'


const User = ({
  displayName
}) => {
  return (
    <strong>{displayName}</strong>
  )
}

User.fragments = {
  user: gql`
    fragment ChatUser on User {
      id
      displayName
    }
  `
}

User.PropTypes = {
  displayName: React.PropTypes.string.isRequired
}

export default User
