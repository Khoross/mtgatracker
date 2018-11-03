import {UPDATE_DECK} from '../actions'

export default function deckReducer(state={}, action) {
    switch(action.type) {
        case UPDATE_DECK:
            let newDeckCards = Object.values(action.deck.cards)
                .reduce((acc, cur) => {
                    acc[cur.mtga_id] = {mtga_id: cur.mtga_id, count: cur.count_in_deck};
                    return acc
                }, {})
            let newDeck = Object.assign(action.deck, {cards: newDeckCards})
            return Object.assign({}, state, {[action.deck.deck_id]: newDeck})
        default:
            return state
    }
}