// @flow 

import {UPDATE_DECK, UPDATE_DECK_COLLECTION, UPDATE_DRAFT_DECK} from '../actions'

export default function deckReducer(state={}, action) {
  switch(action.type) {
    case UPDATE_DRAFT_DECK:
      let deck = {
        deck_id: 'draft',
        pool_name: 'Draft Deck',
        cards: action.cards.reduce(
          (acc, cur) => {
            acc[cur.mtga_id] = {id: cur.mtga_id, count: cur.count_in_deck}
            return acc
          }, {}
        )
      }
      return Object.assign({}, state, {'draft': deck})
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