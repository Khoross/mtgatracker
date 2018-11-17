// @flow 

export const WIN_GAME : 'WIN_GAME' = 'WIN_GAME';
export const LOSE_GAME : 'LOSE_GAME' = 'LOSE_GAME';
export const HYDRATE_STATS : 'HYDRATE_STATS' = 'HYDRATE_STATS';

export const winGame = (deckID) => ({type: WIN_GAME, deckID})
export const loseGame = (deckID) => ({type: LOSE_GAME, deckID})
export const loadStats = (stats) => ({type: HYDRATE_STATS, stats})