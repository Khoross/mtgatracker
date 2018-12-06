// @flow 

import { push } from 'connected-react-router'
import { mapTo } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import { START_GAME, UPDATE_DRAFT_DECK } from '../actions'

const redirectFactory = (actionType, location) => {
  return (action$) => action$.pipe(
    ofType(actionType),
    mapTo(push(location))
  )
}

export combineEpics(
  redirectFactory(START_GAME, '/game'),
  redirectFactory(UPDATE_DRAFT_DECK, '/draft')
);