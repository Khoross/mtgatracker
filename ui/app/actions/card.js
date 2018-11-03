// @flow
export const ADD_CARD : 'ADD_CARD' = 'ADD_CARD';
export const ADD_CARD_BATCH : 'ADD_CARD_BATCH' = 'ADD_CARD_BATCH';

export const addCard = (card) => ({type: ADD_CARD, card})
export const addCardBatch = (cardBatch) => ({type: ADD_CARD_BATCH, payload: cardBatch})