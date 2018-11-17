// @flow 

import { push } from 'connected-react-router'
import { updateDeckSingle } from './deck.js'
import { winGame, loseGame } from './stats.js'

export const START_GAME : 'START_GAME' = 'START_GAME';
export const UPDATE_GAME_DECK : 'UPDATE_GAME_DECK' = 'UPDATE_GAME_DECK';
export const END_GAME : 'END_GAME' = 'END_GAME';
export const TICK_TIMER : 'TICK_TIMER' = 'TICK_TIMER';
export const SWITCH_TIMER : 'SWITCH_TIMER' = 'SWITCH_TIMER';

/**
 * Thunk for adding a list of decks
 * Iterates through the array
 * for each deck in the array, dispatch the cards for batch adding (if needed)
 * then dispatch the deck
 * @param {Obj[]} newDecks Array of deck objects
 */
export function updateGameState(gameStateData) {
  return (dispatch, getState) => {
    const newDeck = gameStateData.draw_odds.library_contents.reduce(
      (acc, cur) => {
        if(cur.mtga_id in acc) {
          acc[cur.mtga_id].count_in_deck += 1
        } else {
          acc[cur.mtga_id] = cur
          acc[cur.mtga_id].count_in_deck = 1
        }
        return acc
      }, {}
    )
    if(getState().game.gameID !== gameStateData.game_id) {
      dispatch(newGame(gameStateData.game_id, gameStateData.deck_id))
      dispatch(updateDeckSingle({deck_id: 'game', pool_name: gameStateData.draw_odds.deck_name, cards: Object.values(newDeck)}))
      dispatch(push('/game'))
      dispatch(runTimers(true))
    } else {
      dispatch(updateDeckSingle({deck_id: 'game', pool_name: gameStateData.draw_odds.deck_name, cards: Object.values(newDeck)}))
    }
  }
}

export function endGame(gameStateData) {
  return (dispatch, getState) => {
    if (getState().game.timers.active){
      dispatch({type: END_GAME})
      if (gameStateData.game.players &&
          gameStateData.game.players[0].name === gameStateData.game.winner) {
        dispatch(winGame(gameStateData.game.players[0].deck.deckID))
      } else if (gameStateData.game.players) {
        dispatch(loseGame(gameStateData.game.players[0].deck.deckID))
      }
    }
  }
}

export function runTimers(forced) {
  return (dispatch, getState) => {
    if(forced || getState().game.timers.active) {
      setTimeout(() => dispatch(runTimers()), 1000)
      dispatch(tickTimer())
    } else {
      return
    }
  }
}

export const newGame = (gameID, deckID) => ({type: START_GAME, gameID, deckID})
export const updateGameDeck = (gameDeck) => ({type: UPDATE_GAME_DECK, gameDeck})
export const tickTimer = () => ({type: TICK_TIMER})
export const switchTimers = (playerPriority) => ({type: SWITCH_TIMER, priority: playerPriority})