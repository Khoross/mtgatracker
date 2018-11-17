// @flow 

import React from 'react';

const Deck = (props) => {
  return (
    <div className="deck-container link" onClick={props.navigate}>
      <h3 className="beleren link deck-name">{props.deck_name}</h3>
    </div>
  );
}

export default React.memo(Deck)
