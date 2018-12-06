// @flow 
import React from 'react';
import { connect } from 'react-redux';
import {ipcRenderer} from 'electron';
import { updateSettings } from '../actions';
import historyIcon from '../img/history.png';
import settingsIcon from '../img/gear.png';
import hideIcon from '../img/hide-512.png';

const HeaderButtons = (props) => {
  return (
    <>
      <h3 className="zoom-panel">
        <span
          className="zoom-out zoom glow-on-hover"
          onClick={props.minZoomReached ? undefined : ()=>props.adjustZoom(-0.1)}
          >-</span>
        /
        <span
          className="zoom-in zoom glow-on-hover"
          onClick={props.maxZoomReached ? undefined : ()=>props.adjustZoom(0.1)}
          >+</span>
      </h3>
      <div
        id="floating-eye"
        className="no-height-contribution glow-on-hover"
        onClick={props.toggleHide}>
        <img className="settings-img"
          src={hideIcon}
          width="30px"
          height="30px" />
      </div>
      <div
        id="floating-history"
        className="no-height-contribution glow-on-hover"
        onClick={()=>ipcRenderer.send('openHistory', null)}>
        <img
          className="settings-img"
          src={historyIcon}
          width="25px"
          height="25px" />
      </div>
      <div
        id="floating-settings"
        className="no-height-contribution glow-on-hover"
        onClick={()=>ipcRenderer.send('openSettings', null)}>
        <img
          className="settings-img"
          src={settingsIcon}
          width="25px"
          height="25px" />
      </div>
    </>
  );
}

const mapStateToProps = (state, props) => ({
  minZoomReached: state.settings.zoom <= 0.5,
  maxZoomReached: state.settings.zoom >= 2
})
const mapDispatchToProps = (dispatch, props) => ({
  adjustZoom: (mod) => dispatch((_, getState) => {
    dispatch(updateSettings('zoom', getState().settings.zoom + mod))
  }),
  toggleHide: () => dispatch((_, getState) => {
    dispatch(updateSettings('hidden', !getState().settings.hidden))
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderButtons)