// @flow 

export UPDATE_DRAFT_DECK : 'UPDATE_DRAFT_DECK' = 'UPDATE_DRAFT_DECK';

export function updateDraftStats(draftData) {
  return (dispatch) => {
    draftData.forEach(card=>{
      card.count_in_deck = card.count
      delete card.count
    })
    //the deck reducer WILL mutate deck.cards - Object.assign used to ensure this doesn't muck anything up
    dispatch(addCardBatch(draftData.reduce(
      (acc, cur) => {
        acc[cur.mtga_id] = cur
        return acc
      }, {})))
    dispatch(updateDraftDeck(draftData))
  }
}

export const updateDraftDeck = (cards) => {type: UPDATE_DRAFT_DECK, cards}