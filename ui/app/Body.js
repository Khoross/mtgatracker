import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import CardList from './containers/DeckPageCardList';
import DeckList from './containers/DeckPageDeckList';

export default () => (
  <App>
    <Switch>
      <div id="tracker-body">
        <Route path={routes.DECK} render={({match}) => <CardList deck={match.params.id} />} />
        <Route exact path={routes.HOME} component={DeckList} />
      </div>
    </Switch>
  </App>
);
