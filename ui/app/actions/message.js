// @flow 

export const DISMISS_MESSAGE : 'DISMISS_MESSAGE' = 'DISMISS_MESSAGE';
export const ADD_MESSAGE : 'ADD_MESSAGE' = 'ADD_MESSAGE';
export const ACK_MESSAGES : 'ACK_MESSAGES' = 'ACK_MESSAGES';

export const dismissMessage = (id) => ({type: DISMISS_MESSAGE, id})
export const addMessage = (message) => ({type: ADD_MESSAGE, message})
export const ackMessages = (ids) => ({type: ACK_MESSAGES, ids})