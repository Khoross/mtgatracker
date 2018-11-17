// @flow 

export const Message = (props) => {
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