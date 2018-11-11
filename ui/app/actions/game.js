import { push } from 'connected-react-router'

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
          acc[cur.mtga_id].count += 1
        } else {
          acc[cur.mtga_id] = {count: 1}
        }
        return acc
      }, {}
    )
    if(getState().game.gameID !== gameStateData.game_id) {
      dispatch(newGame(gameStateData.game_id, gameStateData.deck_id, gameStateData.draw_odds.deck_name, newDeck))
      dispatch(push('/game'))
      dispatch(runTimers(true))
    } else {
      dispatch(updateGameDeck(newDeck))
    }
  }
}

export function endGame(gameStateData) {
  return (dispatch, getState) => {
    dispatch({type: END_GAME})
  }
}

export function runTimers(forced) {
  return (dispatch, getState) => {
    if(forced || getState().game.timers.active) {
      setTimeout(() => dispatch(runTimers()), 250)
      dispatch(tickTimer())
    } else {
      return
    }
  }
}

export const newGame = (gameID, deckID, deckName, gameDeck) => ({type: START_GAME, gameID, deckID, name: deckName, gameDeck})
export const updateGameDeck = (gameDeck) => ({type: UPDATE_GAME_DECK, gameDeck})
export const tickTimer = () => ({type: TICK_TIMER})
export const switchTimers = (playerPriority) => ({type: SWITCH_TIMER, priority: playerPriority})