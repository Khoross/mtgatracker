// @flow 

import React from 'react'
import { connect } from 'react-redux'
import { dismissMessage } from '../actions'

const Message = (props) => {
  return (
    <p className="message-container">
      {
        props.count>1 ?
        <span className="message-count">{ props.count }</span> :
        null
      }
      {
        props.important ?
          <span className="dismiss-message">!!</span> :
          <span className="dismiss-message mayfollow" onClick={props.dismiss}>X</span>
      }
      <span className="update-message" onClick={props.dismiss}>
        <a className="link" href={props.link}>{ props.text }</a>
      </span>
    </p>
  )
}

const mapStateToProps = (state, props) => ({
  count: state.messages[props.id].count,
  important: state.messages[props.id].important,
  link: state.messages[props.id].link,
  text: state.messages[props.id].text
})

const mapDispatchToProps = (dispatch, props) => ({
  dismiss: dispatch(dismissMessage(props.id))
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Message))