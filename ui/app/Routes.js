import React from 'react';
import { Switch, Route } from 'react-router';
import sizeMe from 'react-sizeme'
import { remote } from 'electron'
import routes from './constants/routes';
import App from './containers/App';
import CardList from './containers/DeckPageCardList';
import DeckList from './containers/DeckPageDeckList';

const MainApp = sizeMe({monitorHeight: true})(() => (
  <div id="container" className="container-framed">
    <Route path={routes.DECK} render={({match}) => <CardList deck={match.params.id} />} />
    <Route exact path={routes.HOME} component={DeckList} />
  </div>
));

function resizeWindow(size) {
  console.log(size)
  let bounds = remote.getCurrentWindow().getBounds()
  console.log(bounds)
  let newbounds = Object.assign({}, bounds, {height: parseInt(size.height), width: parseInt(size.width)})
  console.log(newbounds)
  remote.getCurrentWindow().setBounds(newbounds)
}

export default () => (
  <App>
    <Switch>
      <MainApp onSize={resizeWindow} />
    </Switch>
  </App>
);
