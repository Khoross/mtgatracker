// @flow
import {addCardBatch} from './card.js'

export const UPDATE_DECK : 'UPDATE_DECK' = 'UPDATE_DECK';
export const UPDATE_DECK_COLLECTION : 'UPDATE_DECK_COLLECTION' = 'UPDATE_DECK_COLLECTION';

/**
 * Thunk for adding a list of decks
 * Iterates through the array
 * for each deck in the array, dispatch the cards for batch adding (if needed)
 * then dispatch the deck
 * @param {Obj[]} newDecks Array of deck objects
 */
export function updateDeckBatch(newDecks : {[deck_id]: Deck}) {
  return (dispatch) => {
    const cardCollection = {}
    Object.values(newDecks).forEach((deck) => {
      const cardList = deck.cards.reduce(
        (acc, cur) => {
          acc[cur.mtga_id] = cur
          return acc
        }, {})
      Object.assign(cardCollection, cardList)
    })
    dispatch(addCardBatch(cardCollection))
    dispatch(updateDeckCollection(newDecks))
  }
}

export function updateDeckSingle(newDeck : Deck) {
  return (dispatch) => {
    //the deck reducer WILL mutate deck.cards - Object.assign used to ensure this doesn't muck anything up
    dispatch(addCardBatch(newDeck.cards.reduce(
      (acc, cur) => {
        acc[cur.mtga_id] = cur
        return acc
      }, {})))
    dispatch(updateDeck(newDeck))
  }
}

export const updateDeck = (deck) => ({type: UPDATE_DECK, deck})
export const updateDeckCollection = (decks) => ({type: UPDATE_DECK_COLLECTION, decks})