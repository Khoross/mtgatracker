// @flow 

import React from 'react'
import { connect } from 'react-redux';
import Card from './Card';

const CardList = (props) => {
  return (
    <div className="deck-list">
      {
        props.cards.map((card_id)=>
          <Card
            card={card_id}
            deck={props.deck}
            key={card_id}
            extraText={props.extraText || ""}
            hideCost={props.hideCost}
            />)
      }
    </div>
  );
}

function mapStateToProps(state, props) {
  return {
    cards: Object.keys(state.decks[props.deck].cards)
  };
}
export default connect(
  mapStateToProps
)(React.memo(CardList,
  (prev, next) => {
    return prev.deck === next.deck &&
      prev.extraText === next.extraText &&
      prev.hideCost === next.hideCost &&
      prev.cards.length === next.cards.length &&
      prev.cards.every((cur, idx) => cur === next.cards[idx])
  }));