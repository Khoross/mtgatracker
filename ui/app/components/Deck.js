import React, { Component } from 'react';

class Deck extends Component {
  render() {
    return (
      <div className="deck-container link" onClick={()=>this.props.navigate()}>
        <h3 className="beleren link deck-name">{this.props.deck_name}</h3>
      </div>
    );
  }
}

export default Deck
