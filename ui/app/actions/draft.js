// @flow 

import { push } from 'connected-react-router'
import { updateDeckSingle } from './deck.js'

//unusually, this doesn't actually have any actions of its own.
//it just has a thunk which triggers a redirect and deck seeding

export function updateDraftStats(data) {
  return (dispatch, getState) => {
    console.log(data)
    data.forEach(card=>{
      card.count_in_deck = card.count
      delete card.count
    })
    dispatch(updateDeckSingle({deck_id: 'draft', pool_name: 'Draft Deck', cards: data}))
    dispatch(push('/draft'))
  }
}