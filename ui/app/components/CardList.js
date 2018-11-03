import React, { Component } from 'react';
import Card from '../containers/DeckPageCard';

class CardList extends Component {
  render() {
    console.log(this.props.cards)
    return (
      <div className="deck-list">
        <h3 className="beleren link back-link" onClick={()=>this.props.navigate()}>
          Back to decklists
        </h3>
        <h1 className="deck-title">
          {this.props.deck_name}
        </h1>
        {
          this.props.cards.map((card_id)=><Card card={card_id} deck={this.props.deck} key={card_id}/>)
        }
      </div>
    );
  }
}

export default CardList