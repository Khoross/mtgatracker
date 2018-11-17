// @flow 

import React from 'react'
import { connect } from 'react-redux';

const ErrorCount = (props) => {
  return(
    <p className="header-warning">`Errors: ${props.errorCount}`</p>
  )
}

const mapStateToProps = (state, props) => ({
  errorCount: state.settings.errorCount || 0
})

export default connect(mapStateToProps)(React.memo(ErrorCount))