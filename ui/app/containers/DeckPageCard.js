import { connect } from 'react-redux';
import Card from '../components/Card';
import { push } from 'connected-react-router'

function mapStateToProps(state, props) {
  return {
    count: state.decks[props.deck].cards[props.card].count,
    name: state.cards[props.card].pretty_name,
    cost: state.cards[props.card].cost,
    color: state.cards[props.card].color_identity
  };
}

export default connect(
  mapStateToProps
)(Card);