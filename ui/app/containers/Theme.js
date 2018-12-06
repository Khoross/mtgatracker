// @flow 
import React from 'react'
import { connect } from 'react-redux'

const Theme = (props) => {
  return(
    <>
      {
        props.multiple ?
          props.styleSheets.map(
            sheet => <link rel="stylesheet" href={sheet} key={sheet} />
          ) :
          <link rel="stylesheet" href={props.style} />
      }
    </>
  )
}

const minimal = ['./style/flat.css', './style/minimal.css']

const mapStateToProps = (state, props) => {
  if (state.settings.useTheme){
    return {style: state.settings.themeFile}
  } else if (state.settings.useMinimal) {
    return {styleSheets: minimal, multiple: true}
  } else if (state.settings.useFlat) {
    return {style: './style/flat.css'}
  }
}

export default connect(mapStateToProps)(React.memo(Theme))