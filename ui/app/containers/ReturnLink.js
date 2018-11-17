// @flow 

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

const ReturnLink = (props) => {
  return (
    <h3
      className="beleren link back-link hide-on-rollup"
      onClick={props.navigate}
      >
        Back to decklists
    </h3>
  )
}

const mapStateToProps = (state, props) => ({})
const mapDispatchToProps = (dispatch, props) => ({navigate: () => dispatch(push('/'))})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ReturnLink))