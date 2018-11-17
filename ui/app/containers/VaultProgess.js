// @flow 

import React from 'react'
import { connect } from 'react-redux'

const VaultProgress = (props) => 
  props.display ?
  <h3 className="beleren">
    {`Vault Progress: ${props.vaultProgress}%`}
  </h3> :
  null

const mapStateToProps = (state, props) => ({
  display: state.settings.lastVaultProgress && 
    state.settings.lastVaultProgress > state.settings.minVaultProgress,
  vaultProgress: state.settings.lastVaultProgress
})

export default connect(mapStateToProps)(React.memo(VaultProgress))