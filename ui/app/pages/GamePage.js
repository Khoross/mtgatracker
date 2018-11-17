// @flow 

import React, { Component } from 'react'
import { connect } from 'react-redux';
import Check from '../components/CheckComponent.js';
import { WinLossEntry } from '../containers/WinLossEntry.js'
import { VaultProgress } from '../containers/VaultProgess.js'
import { ReturnLink } from '../containers/ReturnLink.js'
import { Timers } from '../containers/Timers.js'
import { ErrorCount } from '../containers/ErrorCount.js'
import { MessageList } from '../containers/MessageList.js'
import { CardsRemaining } from '../containers/CardsRemaining.js'

const GamePage = (props) => {
  return (
    <div id="container">
      <div id="tracker-header">
        <h1 class="game-deck-title">{ deck_name }</h1>
        <HeaderButtons />
      </div>
      <div id="tracker-body">
        <div id="game-deck-list">
          <Check active={props.showTotalCounters}>
            <div class="win-loss-group">
              <Check active={props.showTotalTotal}>
                <WinLossEntry label="Total" type="alltime" deck="total"/>
              </Check>
              <Check active={props.showTotalSession}>
                <WinLossEntry label="Session Total" type="session" deck="total"/>
              </Check>
            </div>
          </Check>
          <Check active={props.showDeckCounters}>
            <div class="win-loss-group">
              <Check active={props.showDeckTotal}>
                <WinLossEntry label="Deck" type="alltime" deck={props.gameDeckID}}/>
              </Check>
              <Check active={props.showDeckSession}>
                <WinLossEntry label="Session Deck" type="session" deck={props.gameDeckID}/>
              </Check>
            </div>
          </Check>
          <Check active={props.showVault}>
            <VaultProgress progress={lastVaultProgress}/>
          </Check>
          <Check active={props.showErrors}>
            <ErrorCount errorCount={error_count} />
          </Check>
          <MessageList messageIDs={messages}/>
          <Check active={!props.active}>
            <ReturnLink />
          </Check>
          <CardsRemaining />
          <CardList deck="game" />
          <Check active={props.showTimers}>
            <Timers />
          </Check>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state, props) {
  return {
    showTotalCounters: state.settings.showWinLossCounter &&
      (state.settings.showTotalWinLossCounter ||
        state.settings.showDailyTotalWinLossCounter),
    showTotalTotal: state.settings.showTotalWinLossCounter,
    showTotalSession: state.settings.showDailyTotalWinLossCounter,
    gameDeckID: state.game.deckID,
    showDeckCounters: state.settings.showWinLossCounter &&
      (state.settings.showDeckWinLossCounter ||
        state.settings.showDailyDeckWinLossCounter),
    showDeckTotal: state.settings.showDeckWinLossCounter,
    showDeckSession: state.settings.showDailyDeckWinLossCounter,
    showVault: state.settings.showVaultProgress,
    showErrors: state.settings.showErrors,
    active: state.game.timers.active,
    showTimers: state.settings.showChessTimers
  };
}

export default connect(
  mapStateToProps
)(GamePage);