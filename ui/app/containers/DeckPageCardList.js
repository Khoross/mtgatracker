import { connect } from 'react-redux';
import CardList from '../components/CardList';
import { push } from 'connected-react-router'

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