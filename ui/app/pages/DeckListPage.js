// @flow 

import React from 'react'
import { connect } from 'react-redux';
import Check from '../components/CheckComponent.js';
import WinLossEntry from '../containers/WinLossEntry.js'
import VaultProgress from '../containers/VaultProgess.js'
import MessageList from '../containers/MessageList.js'
import DeckList from '../containers/DeckList.js'
import HeaderButtons from '../containers/HeaderButtons.js'

const DeckListPage = (props) => {
  return (
    <>
      <div id="tracker-header">
        <h1 className="beleren header-title">MTGATracker</h1>
        <HeaderButtons />
      </div>
      <div id="tracker-body">
        <div id="game-deck-list">
          <Check active={props.showTotalCounters}>
            <div className="win-loss-group">
              <Check active={props.showTotalTotal}>
                <WinLossEntry label="Total" type="alltime" deck="total"/>
              </Check>
              <Check active={props.showTotalSession}>
                <WinLossEntry label="Session Total" type="session" deck="total"/>
              </Check>
            </div>
          </Check>
          <div id="decklists-container">
            <Check active={props.showVault}>
              <VaultProgress />
            </Check>
            <h3 className="reminder">Pick a deck, or start a game!</h3>
            <MessageList />
            <DeckList />
          </div>
        </div>
      </div>
    </>
  )
}

function mapStateToProps(state, props) {
  return {
    showTotalCounters: state.settings.showWinLossCounter &&
      (state.settings.showTotalWinLossCounter ||
        state.settings.showDailyTotalWinLossCounter),
    showTotalTotal: state.settings.showTotalWinLossCounter,
    showTotalSession: state.settings.showDailyTotalWinLossCounter,
    showVault: state.settings.showVaultProgress
  };
}

export default connect(
  mapStateToProps
)(DeckListPage);