import { combineReducers } from 'redux';
import {START_GAME, UPDATE_GAME_DECK, END_GAME,TICK_TIMER ,SWITCH_TIMER} from '../actions'

const idReducer = (state = '', action) => {
    switch(action.type){
        case START_GAME:
            return action.gameID
        default:
            return state
    }
}

const deckIDReducer = (state = '', action) => {
    switch(action.type){
        case START_GAME:
            return action.deckID
        default:
            return state
    }
}

const nameReducer = (state = '', action) => {
    switch(action.type){
        case START_GAME:
            return action.name
        default:
            return state
    }
}

const cardsReducer = (state = {}, action) => {
    switch(action.type){
        case START_GAME:
            return action.gameDeck
        case UPDATE_GAME_DECK:
            return action.gameDeck
        default:
            return state
    }
}

const timersReducer = (state = {active: false}, action) => {
    switch(action.type) {
        case START_GAME:
            return {
                    total: 0,
                    player: 0,
                    opponent: 0,
                    priority: undefined,
                    lastSplit: Date.now(),
                    active: true
                }
        case TICK_TIMER:
            if(state.active) {
                const now = Date.now()
                const delta = now - state.lastSplit
                return {
                    total: state.total + delta,
                    player: state.player + (state.priority === true ? delta : 0),
                    opponent: state.opponent + (state.priority === false ? delta : 0),
                    priority: state.priority,
                    lastSplit: now,
                    active: true
                }
            } else {
                return state
            }
        case SWITCH_TIMER:
            if(state.active) {
                const now = Date.now()
                const delta = now - state.lastSplit
                return {
                    total: state.total + delta,
                    player: state.player + (state.priority === true ? delta : 0),
                    opponent: state.opponent + (state.priority === false ? delta : 0),
                    priority: action.priority,
                    lastSplit: now,
                    active: true
                }
            } else {
                return state
            }
        case END_GAME:
            if(state.active) {
                const now = Date.now()
                const delta = now - state.lastSplit
                return {
                    total: state.total + delta,
                    player: state.player + (state.priority === true ? delta : 0),
                    opponent: state.opponent + (state.priority === false ? delta : 0),
                    priority: state.priority,
                    lastSplit: now,
                    active: false
                }
            } else {
                return state
            }
        default:
            return state
    }
}

export default combineReducers({
    gameID: idReducer,
    deckID: deckIDReducer,
    name: nameReducer,
    cards: cardsReducer,
    timers: timersReducer
})