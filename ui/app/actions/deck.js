// @flow
import {addCardBatch} from './card.js'

export const UPDATE_DECK : 'UPDATE_DECK' = 'UPDATE_DECK';

/**
 * Thunk for adding a list of decks
 * Iterates through the array
 * for each deck in the array, dispatch the cards for batch adding (if needed)
 * then dispatch the deck
 * @param {Obj[]} newDecks Array of deck objects
 */
export function updateDecks(newDecks : {[deck_id]: Deck}) {
    return (dispatch) => {
        Object.values(newDecks).forEach((deck) => {
            dispatch(addCardBatch(deck.cards))
            dispatch(updateDeck(deck))
        })
    }
}

export const updateDeck = (deck) => ({type: UPDATE_DECK, deck})