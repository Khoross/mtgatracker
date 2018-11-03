// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import card from './card';
import deck from './deck';
import settings from './setting';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({ router: routerReducer,
      counter,
      cards: card,
      decks: deck,
      settings })
  );
}
