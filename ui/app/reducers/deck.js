import {UPDATE_DECK, UPDATE_DECK_COLLECTION} from '../actions'

export default function deckReducer(state={}, action) {
  switch(action.type) {
    case UPDATE_DECK:
      //this mutates bits of the action. Do not use elsewhere.
      action.deck.cards = action.deck.cards.reduce(
        (acc, cur) => {
          acc[cur.mtga_id] = {id: cur.mtga_id, count: cur.count_in_deck}
          return acc
        }, {}
        )
      return Object.assign({}, state, {[action.deck.deck_id]: action.deck})
    case UPDATE_DECK_COLLECTION:
      //nasty loop to extract only the relevant card details for each deck
      Object.values(action.decks).forEach(
        deck => {
          deck.cards = deck.cards.reduce(
            (acc, cur) => {
              acc[cur.mtga_id] = {id: cur.mtga_id, count: cur.count_in_deck}
              return acc
            }, {}
            )
        }
      )
      return Object.assign({}, state, action.decks)
    default:
      return state
  }
}