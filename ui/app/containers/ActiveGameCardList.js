import { connect } from 'react-redux';
import Card from './DeckPageCard';
import { push } from 'connected-react-router'

class CardList extends Component {
  render() {
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

function mapStateToProps(state, props) {
  return {
    deck_name: state.decks[props.deck].pool_name,
    cards: Object.keys(state.decks[props.deck].cards)
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