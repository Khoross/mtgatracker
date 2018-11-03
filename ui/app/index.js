import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
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
  if (data.data_type=="decklist_change") {
    console.log(data)
    store.dispatch(updateDecks(data.decks))
  }
}

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
