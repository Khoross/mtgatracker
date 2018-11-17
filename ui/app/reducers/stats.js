import { combineReducers } from 'redux';
import { WIN_GAME, LOSE_GAME, HYDRATE_STATS } from '../actions'

function basicUpdate(state={}, action) {
  switch(action.type) {
    case WIN_GAME:
    {
      const newTotal = {total: Object.assign({win: 0, loss: 0}, state.total)}
      newTotal.total.win+=1
      let newDeck = {}
      if(action.deckID){
        newDeck = {[action.deckID]: Object.assign({win: 0, loss: 0}, state[action.deckID])}
        newDeck[action.deckID].win += 1
      }
      return Object.assign({}, state, newTotal, newDeck)
    }
    case LOSE_GAME:
    {
      const newTotal = {total: Object.assign({win: 0, loss: 0}, state.total)}
      newTotal.total.loss+=1
      let newDeck = {}
      if(action.deckID){
        newDeck = {[action.deckID]: Object.assign({win: 0, loss: 0}, state[action.deckID])}
        newDeck[action.deckID].loss += 1
      }
      return Object.assign({}, state, newTotal, newDeck)
    }
    default:
      return state
  }
}

function hydrateUpdate(state={}, action) {
  if(action.type === HYDRATE_STATS) {
    return action.stats
  } else {
    return basicUpdate(state, action)
  }
}

export default combineReducers({
    alltime: hydrateUpdate,
    session: basicUpdate
})