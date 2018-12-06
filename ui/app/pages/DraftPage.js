// @flow 

import React from 'react'
import { connect } from 'react-redux';
import Check from '../components/CheckComponent.js';
import ReturnLink from '../containers/ReturnLink.js'
import ErrorCount from '../containers/ErrorCount.js'
import MessageList from '../containers/MessageList.js'
import CardList from '../containers/CardList.js'
import HeaderButtons from '../containers/HeaderButtons.js'

const DraftPage = (props) => {
  return(
    <>
      <div id="tracker-header">
        <h1 className="game-deck-title gamecomplete">Draft Picks</h1>
        <HeaderButtons />
        <ReturnLink />
      </div>
      <div id="tracker-body">
        <div id="draft-collection-list">
          <Check active={props.showErrors}>
            <ErrorCount />
          </Check>
          <MessageList/>
          <CardList deck="draft" extraText="Owned" hideCost={true}/>
        </div>
      </div>
    </>
  )
}

function mapStateToProps(state, props) {
  return {
    showErrors: state.settings.showErrors
  };
}

export default connect(
  mapStateToProps
)(DraftPage);