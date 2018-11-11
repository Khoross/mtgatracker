import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './GamePageCard';
import { push } from 'connected-react-router'

class CardList extends Component {
  render() {
    return (
      <div className="deck-list">
        {
          !this.props.active ?
          <h3 className="beleren link back-link" onClick={()=>this.props.navigate()}>
            Back to decklists
          </h3> :
          undefined
        }
        <h1 className="deck-title">
          {this.props.deck_name}
        </h1>
        {
          this.props.cards.map((card_id)=><Card card={card_id} key={card_id}/>)
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    active: state.game.timers.active,
    deck_name: state.game.name,
    cards: Object.keys(state.game.cards)
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    navigate: () => dispatch(push(`/`))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList);