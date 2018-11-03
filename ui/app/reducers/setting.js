import {UPDATE_SETTINGS, HYDRATE_SETTINGS} from '../actions'

export default function settingsReducer(state={}, action) {
    switch(action.type) {
        case UPDATE_SETTINGS:
            return Object.assign({}, state, {[action.key]: action.value})
        case HYDRATE_SETTINGS:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}