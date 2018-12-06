// @flow 

import React from 'react'
import { connect } from 'react-redux';
import Check from '../components/CheckComponent.js';
import WinLossEntry from '../containers/WinLossEntry.js'
import VaultProgress from '../containers/VaultProgess.js'
import ReturnLink from '../containers/ReturnLink.js'
import MessageList from '../containers/MessageList.js'
import CardList from '../containers/CardList.js'
import HeaderButtons from '../containers/HeaderButtons.js'

const DeckDetailsPage = (props) => {
  return (
    <>
      <div id="tracker-header">
        <h1 className="beleren header-title">MTGA Tracker</h1>
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
          <Check active={props.showDeckCounters}>
            <div className="win-loss-group">
              <Check active={props.showDeckTotal}>
                <WinLossEntry label="Deck" type="alltime" deck={props.deckID}/>
              </Check>
              <Check active={props.showDeckSession}>
                <WinLossEntry label="Session Deck" type="session" deck={props.deckID}/>
              </Check>
            </div>
          </Check>
          <Check active={props.showVault}>
            <VaultProgress />
          </Check>
          <MessageList />
          <ReturnLink />
          <h1 className="deck-title"> <i className="fas fa-chevron-left"></i>{props.deck_name}</h1>
          <CardList deck={props.deckID} />
        </div>
      </div>
    </>
  )
}

function mapStateToProps(state, props) {
  const id = props.match.params.id
  return {
    deck_name: state.decks[id].pool_name,
    deckID: id,
    showTotalCounters: state.settings.showWinLossCounter &&
      (state.settings.showTotalWinLossCounter ||
        state.settings.showDailyTotalWinLossCounter),
    showTotalTotal: state.settings.showTotalWinLossCounter,
    showTotalSession: state.settings.showDailyTotalWinLossCounter,
    showDeckCounters: state.settings.showWinLossCounter &&
      (state.settings.showDeckWinLossCounter ||
        state.settings.showDailyDeckWinLossCounter),
    showDeckTotal: state.settings.showDeckWinLossCounter,
    showDeckSession: state.settings.showDailyDeckWinLossCounter,
    showVault: state.settings.showVaultProgress
  };
}

export default connect(
  mapStateToProps
)(DeckDetailsPage);