// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import card from './card';
import deck from './deck';
import game from './game';
import settings from './setting';
import messages from './messages';
import stats from './stats';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({ router: routerReducer,
      cards: card,
      decks: deck,
      game,
      settings,
      messages,
      stats })
  );
}
