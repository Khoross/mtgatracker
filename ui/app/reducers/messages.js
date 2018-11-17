import {ADD_MESSAGE, DISMISS_MESSAGE, ACK_MESSAGES} from '../actions'

export default function messageReducer(state={}, action) {
  switch(action.type) {
    case ADD_MESSAGE:
      //if we were provided an ID and we already have this message, skip it
      if(action.message.id && action.message.id in state){
        return state
      }
      //if we have an existing message which has not been dismissed, has the same text and link and importance, increment its count instead
      const matched = Object.values(state).filter(msg => 
        msg.show &&
        msg.text === action.message.text &&
        msg.link === action.message.link &&
        msg.important === action.message.important)
      if(matched.length > 0) {
        const newMatch = Object.assign({}, matched[0])
        newMatch.count += 1
        return Object.assign({}, state, {[newMatch.id]: newMatch})
      } else {
        //if we don't have an ID, generate one
        //at this stage be sure to flag it as visible and generate a count
        const id = action.message.id !== undefined ? action.message.id : Date.now()
        action.messge.show = true
        action.message.count = 1
        return Object.assign({}, state, {[id]: action.message})
      }
    case DISMISS_MESSAGE:
      const newMessages = Object.assign({}, state)
      if(state[action.id].id === undefined) {
        //if the message doesn't have an internal id, then just remove it entirely
        delete newMessages[action.id]
      } else {
        //otherwise flag this specific message as seen
        newMessage[action.id].show = false
      }
      //I am aware that mutating a const feels super weird. That's because it is. Blame JS
      return newMessages
    case ACK_MESSAGES:
      const ack_messages = action.ids.reduce(
        (acc, cur) => {
          acc[cur] = {id: cur, show: false}
          return acc
        }, {})
      return Object.assign({}, state, ack_messages)
    default:
      return state
  }
}