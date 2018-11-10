import React, { Component } from 'react';
import Deck from '../containers/DeckPageDeck';

class DeckList extends Component {
  render() {
    return (
      <div id="decklists-container">
        <h3 className="reminder">Pick a deck, or start a game!</h3>
        {
          this.props.decks.length === 0 ?
            <p className="header-warning">
              MTGATracker couldn't find any decks. If this is the first time launching MTGATracker, please edit, then save any deck in MTGA now!
            </p> :
            this.props.decks.map(deck_id => <Deck deck={deck_id} key={deck_id}/>)
        }
      </div>
    );
  }
}

export default DeckList