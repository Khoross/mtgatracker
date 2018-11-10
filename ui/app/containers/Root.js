// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import sizeMe from 'react-sizeme'
import { remote } from 'electron'
import type { Store } from '../reducers/types';
import Body from '../Body';
import Header from '../components/Header';

type Props = {
  store: Store,
  history: {}
};

const MainApp = sizeMe({monitorHeight: true})(() => (
  <div id="container" className="container-framed">
    <Header />
    <Body />
  </div>
));

function resizeWindow(size) {
  let bounds = remote.getCurrentWindow().getBounds()
  Object.assign(bounds, {height: parseInt(size.height), width: parseInt(size.width)})
  remote.getCurrentWindow().setBounds(bounds)
}


export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MainApp onSize={resizeWindow}/>
        </ConnectedRouter>
      </Provider>
    );
  }
}
