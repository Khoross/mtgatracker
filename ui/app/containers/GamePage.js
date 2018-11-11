import React, { Component } from 'react'
import { connect } from 'react-redux';
import GamePageCardList from './GamePageCardList';
import { push } from 'connected-react-router'

//look up correct wins store from props
//type prop should either be 'alltime' or 'session'
//deck prop should either be an ID or 'total'
//
const WinLossEntry = connect(
  (store, props) => (
    store.settings.winLossCounter && store.settings.winLossCounter[props.type] && store.settings.winLossCounter[props.type][props.deck] ?
  {
    wins: store.settings.winLossCounter[props.type][props.deck].win,
    losses: store.settings.winLossCounter[props.type][props.deck].loss
  } :
  {
    wins: 0,
    losses: 0
  })
)((props) => {
  return(
    <div className="win-loss-div" >
      <span className="win-loss-label">
        {props.label}
      </span>
      <span className="win-loss-counter">
        {`W : ${props.wins} \xa0\u2014\xa0 L : ${props.losses}`}
      </span>
    </div>
  )
})




const VaultProgress = (props) => 
  <h3 className="beleren" rv-showvault="lastVaultProgress">
    {`Vault Progress: ${props.vaultProgress}%`}
  </h3>
const Errors = () => null
const MessageList = () => null
const CardsLeft = () => null
const ReturnButton = connect(()=>{}, {push})(() => 
  <h3 className="beleren link back-link" onClick={()=>this.props.push('/')}>
    Back to decklists
  </h3>
)

const TotalTimer = connect((store)=>({time: Math.round(store.game.timers.total/1000)}))((props) => 
  <h2 id="overall-timer">
    {
      props.time > 3600 ? 
      `${Math.floor(props.time / 3600).toFixed(0)}:${Math.floor((props.time % 3600) / 60).toFixed(0).padStart(2, "0")}:${Math.floor(props.time % 60).toFixed(0).padStart(2, "0")}` :
      `${Math.floor(props.time / 60).toFixed(0).padStart(2, "0")}:${Math.floor(props.time % 60).toFixed(0).padStart(2, "0")}`
    }
  </h2>
)

const SubTimer = connect(
  (store, props)=>({
    time: Math.round(store.game.timers[props.timer]/1000),
    className: store.game.timers.priority === props.priority ? 'chess-timer active' : 'chess-timer'
  })
)(
  (props) => 
    <h3 id={props.id} className={props.className}>
      {
        props.time > 3600 ?
        `${(props.time / 3600).toFixed(0).padStart(2, "0")}:${((props.time % 3600) / 60).toFixed(0).padStart(2, "0")}:${(props.time % 60).toFixed(0).padStart(2, "0")}` :
        `${(props.time / 60).toFixed(0).padStart(2, "0")}:${(props.time % 60).toFixed(0).padStart(2, "0")}`
      }
    </h3>
)

const Timers = () => {
  return (
    <React.Fragment>
      <TotalTimer />
      <SubTimer id="hero-timer" timer="player" priority={true}/>
      <SubTimer id="opponent-timer" timer="opponent" priority={false}/>
    </React.Fragment>
  )
}

class GamePage extends Component {
  render() {
    return (
      <div className="deck-list">
        {
          this.props.showTotalCounters ?
            <div className="win-loss-group">
              {this.props.showTotalTotal ?
                <WinLossEntry label='Total' type='alltime' deck='total'/>:
                null}
              {this.props.showTotalSession ?
                <WinLossEntry label='Session Total' type='session' deck='total'/>:
                null}
            </div> :
            null
        }
        {
          this.props.showDeckCounters ?
            <div className="win-loss-group">
              {this.props.showDeckTotal ?
                <WinLossEntry label='Deck' type='alltime' deck={this.props.deck}/>:
                null}
              {this.props.showDeckSession ?
                <WinLossEntry label='Session Deck' type='session' deck={this.props.deck}/>:
                null}
            </div> :
            null
        }
        <VaultProgress />
        <Errors />
        <MessageList />
        {!this.props.active ? <ReturnButton /> : null}
        <CardsLeft />
        <GamePageCardList />
        <Timers />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    active: state.game.timers.active,
    showTotalCounters: state.settings.showWinLossCounter &&
      (state.settings.showTotalWinLossCounter ||
        state.settings.showDailyTotalWinLossCounter),
    showDeckCounters: state.settings.showWinLossCounter &&
      (state.settings.showDeckWinLossCounter ||
        state.settings.showDailyDeckWinLossCounter),
    showTotalTotal: state.settings.showTotalWinLossCounter,
    showTotalSession: state.settings.showDailyTotalWinLossCounter,
    showDeckTotal: state.settings.showDeckWinLossCounter,
    showDeckSession: state.settings.showDailyDeckWinLossCounter
  };
}

export default connect(
  mapStateToProps
)(GamePage);