import { connect } from 'react-redux';
import Deck from '../components/Deck';
import { push } from 'connected-react-router'

function mapStateToProps(state, props) {
  return {
    deck_name: state.decks[props.deck].pool_name
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    navigate: () => dispatch(push(`/deck/${props.deck}`))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
