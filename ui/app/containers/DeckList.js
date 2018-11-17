// @flow 

import React from 'react';
import { connect } from 'react-redux';
import Deck from './Deck';

const DeckList = (props) => {
  return (
    <div id="decklists-container">
      {
        props.decks.length === 0 ?
          <p className="header-warning">
            MTGATracker couldn't find any decks. If this is the first time launching MTGATracker, please edit, then save any deck in MTGA now!
          </p> :
          props.decks.map(deck_id => <Deck deck={deck_id} key={deck_id}/>)
      }
    </div>
  );
}

function mapStateToProps(state, props) {
  return {
    decks: Object.keys(state.decks).filter((id) => id !== "game" && id !== "draft")
  };
}

export default connect(
  mapStateToProps
)(React.memo(DeckList, (prev, next) =>{
  return prev.decks.length === next.decks.length &&
    prev.decks.every((id, idx) => id === next.decks[idx])
}));
