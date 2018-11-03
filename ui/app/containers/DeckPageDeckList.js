import { connect } from 'react-redux';
import DeckList from '../components/DeckList';

function mapStateToProps(state, props) {
  return {
    decks: Object.keys(state.decks)
  };
}

export default connect(
  mapStateToProps
)(DeckList);
