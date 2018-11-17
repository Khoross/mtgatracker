import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { remote, ipcRenderer } from 'electron';
import Root from './pages/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import ReconnectingWebSocket from 'reconnectingwebsocket'
//I import a lot of action creators here
import {updateDeckBatch,
        gameActivity,
        updateGameState,
        endGame,
        switchTimers,
        updateSettingsBatch,
        ackMessages,
        loadStats,
        updateDraftStats} from './actions'

const store = configureStore();
let port = 5678;
const ws = new ReconnectingWebSocket(`ws://127.0.0.1:${port}/`, null, {constructor: WebSocket})

let onMessage = (data) => {
  data = JSON.parse(event.data)
  console.log(data)
  switch(data.data_type) {
    case "decklist_change":
      store.dispatch(updateDeckBatch(data.decks))
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
        store.dispatch(endGame(data))
      }
      return
    case "message":
      if(data.decisionPlayerChange) {
        store.dispatch(switchTimers(data.heroIsDeciding))
      } else if (data.draft_collection_count) {
        //we're in a draft - hoist us to the draft page and set the deck
        store.dispatch(updateDraftStats(data.draft_collection_count))
      }
      return
    default:
      return
  }
}

//settings we care about:
//display options - these are in settings
//win stats (NOTE: need to deep copy)
//acknowledged messages
const updateFromRemote = () => {
  store.dispatch(ackMessages(remote.getGlobal('messagesAcknowledged')))
  store.dispatch(updateSettingsBatch(remote.getGlobal('settings')))
  //remote.getGlobal only performs a shallow copy. Here we perform a deep copy manually
  //redux does not appreciate parts of the store being remote
  const displayWinLoss = Object.entries(
    remote.getGlobal('winLossCounter').alltime
  ).reduce(
    (acc, [key, stats]) => {
      acc[key] = Object.assign({}, stats)
      return acc
    }, {})
  store.dispatch(loadStats(displayWinLoss))
}
updateFromRemote()
ipcRenderer.on('settingsChanged', updateFromRemote)

ws.onmessage = onMessage;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./pages/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./pages/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
