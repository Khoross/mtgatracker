// @flow 

import React from 'react'
import { connect } from 'react-redux'

const WinLossEntry = (props) => {
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
}

const mapStateToProps = (state, props) => (
    state.stats && state.stats[props.type] && state.stats[props.type][props.deck] ?
  {
    wins: state.stats[props.type][props.deck].win,
    losses: state.stats[props.type][props.deck].loss
  } :
  {
    wins: 0,
    losses: 0
  })

export default connect(
  mapStateToProps
)(React.memo(WinLossEntry))