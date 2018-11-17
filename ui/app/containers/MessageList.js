// @flow 

import React from 'react'
import { connect } from 'react-redux'
import Message from './Message'

const MessageList = (props) => {
  if (props.messageIDs.length === 0) {
    return null
  }
  return (
    <div className="messages">
      {
        props.messageIDs.map(id => <Message id={id} key={id}/>)
      }
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  messageIDs: Object.values(state.messages).filter(msg => msg.show).map(msg=>msg.id)
})

export default connect(mapStateToProps)(MessageList)