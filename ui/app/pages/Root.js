// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router';
import sizeMe from 'react-sizeme'
import { remote } from 'electron'
import Theme from '../containers/theme.js'
import routes from '../constants/routes';
import DeckListPage from './DeckListPage.js'
import DeckDetailsPage from './DeckDetailsPage.js'
import GamePage from './GamePage.js'
import DraftPage from './DraftPage.js'
import type { Store } from '../reducers/types';

type Props = {
  store: Store,
  history: {}
};

const MainApp = sizeMe({monitorHeight: true})(() => (
    <div id="container" className="container-framed">
      <Route exact path={routes.HOME} component={DeckListPage} />
      <Route path={routes.DECK} component={DeckDetailsPage} />
      <Route path={routes.GAME} component={GamePage} />
      <Route path={routes.DRAFT} component={DraftPage} />
    </div>
));

function resizeWindow(size) {
  let bounds = remote.getCurrentWindow().getBounds()
  Object.assign(bounds, {height: parseInt(size.height), width: parseInt(size.width)})
  remote.getCurrentWindow().setBounds(bounds)
}

const Root = ({store, history}) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Theme />
          <MainApp onSize={resizeWindow}/>
        </>
      </ConnectedRouter>
    </Provider>
  );
}

export default Root
