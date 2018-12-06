import React, { Component } from 'react';
import {remote, ipcRenderer} from 'electron';
import historyIcon from '../img/history.png';
import settingsIcon from '../img/gear.png';
import hideIcon from '../img/hide-512.png';

function adjustZoom(diff) {
  remote.getCurrentWindow().webContents.setZoomFactor(0.5)
}

export default class Header extends Component {
  render() {
    return (
      <>
        <h3 className="zoom-panel">
          <span className="zoom-out zoom glow-on-hover" onClick={()=>adjustZoom(-0.1)}>-</span>
          /
          <span className="zoom-in zoom glow-on-hover" onClick={()=>adjustZoom(0.1)}>+</span>
        </h3>
        <div
          id="floating-eye"
          className="no-height-contribution glow-on-hover">
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
}
