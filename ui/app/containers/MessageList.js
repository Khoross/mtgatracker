// @flow 

export const MessageList = (props) => {
  if (props.messageIDs.length === 0) {
    return null
  }
  return (
    <div className="messages">
      {
        props.messageIDs.map(id => <Message id={id} key={id} />)
      }
    </div>
  )
}