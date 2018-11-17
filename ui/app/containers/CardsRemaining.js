// @flow 

import React from 'react'
import { connect } from 'react-redux'

const CardsRemaining = (props) => {
  return (
    <h3 className="cardsleft">{`${props.cardsLeft} cards in deck`}</h3>
  )
}

const mapStateToProps = (state, props) => ({
  cardsLeft: Object.values(state.decks.game.cards).reduce((acc, cur) => acc+cur.count, 0)
})

export default connect(mapStateToProps)(React.memo(CardsRemaining))