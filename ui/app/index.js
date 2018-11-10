import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { remote } from 'electron';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import ReconnectingWebSocket from 'reconnectingwebsocket'
import {updateDecks} from './actions'

const store = configureStore();
let port = 5678;
const ws = new ReconnectingWebSocket(`ws://127.0.0.1:${port}/`, null, {constructor: WebSocket})

let onMessage = (data) => {
  data = JSON.parse(event.data)
  console.log(data)
  switch(data.data_type) {
    case "decklist_change":
      store.dispatch(updateDecks(data.decks))
      return
    case "game_state":
      console.log(data)
      return
    default:
      return
  }
}

console.log(remote.getGlobal('settings'))

ws.onmessage = onMessage;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
