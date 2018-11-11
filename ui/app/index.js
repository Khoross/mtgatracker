import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { remote, ipcRenderer } from 'electron';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import ReconnectingWebSocket from 'reconnectingwebsocket'
import {updateDecks, gameActivity, updateGameState, endGame, switchTimers, updateSettingsBatch} from './actions'

const store = configureStore();
let port = 5678;
const ws = new ReconnectingWebSocket(`ws://127.0.0.1:${port}/`, null, {constructor: WebSocket})

let onMessage = (data) => {
  data = JSON.parse(event.data)
  switch(data.data_type) {
    case "decklist_change":
      store.dispatch(updateDecks(data.decks))
      return
    case "game_state":
      if(!data.match_complete) {
        //dispatch a game update event
        //this is a thunk
        //it first checks if this is related to a currently running game
        //if not, it initiates a new game (and terminates the old one)
        //then it handles library and timer updates
        store.dispatch(updateGameState(data))
      } else {
        //finish game
        //again this is a thunk
        //first it handles terminating the current game
        //and then the process of trying to upload it
        store.dispatch(endGame())
      }
      return
    case "message":
      if(data.decisionPlayerChange) {
        console.log(data)
        store.dispatch(switchTimers(data.heroIsDeciding))
      }
      return
    default:
      return
  }
}

store.dispatch(updateSettingsBatch(remote.getGlobal('settings')))
ipcRenderer.on('settingsChanged', () => store.dispatch(updateSettingsBatch(remote.getGlobal('settings'))))

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
