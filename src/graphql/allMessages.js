import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import app from '../app'
import ChatMessage from '../ChatMessage'


export const query = gql`
  query AllMessages {
    messages {
      ...ChatMessage
    }
  },
  ${ChatMessage.fragments.message}
`

class NewMessagesListener extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    messages: React.PropTypes.arrayOf(React.PropTypes.shape(ChatMessage.propTypes)).isRequired,
    children: React.PropTypes.func.isRequired,
    refetch: React.PropTypes.func.isRequired,
  }
  constructor() {
    super(...arguments)
    this.onMessagesChanged = null
    this.onUsersChanges = null
  }
  componentDidMount() {
    this.onMessagesChanged = app.models.message.addNewMessagesListener(this.props.refetch)
    //this.onUsersChanges = userModel.addOnUsersChanges(this.props.refetch)
  }
  componentWillUnmount() {
    this.onMessagesChanged.off()
    //this.onUsersChanges.off()
  }
  render() {
    const { loading, messages, children } = this.props
    return children({ loading, messages })
  }
}

export const Provider = graphql(query, {
  props: ({ ownProps: { children }, data }) => {
    return {
      loading: data.loading,
      messages: data.messages || [],
      refetch: data.refetch,
      children
    }
  }
})(NewMessagesListener)
