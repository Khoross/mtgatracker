import React, { Component } from 'react';
import {remote, ipcRenderer} from 'electron';
import historyIcon from '../img/history.png';
import settingsIcon from '../img/gear.png';
import hideIcon from '../img/hide-512.png';

function adjustZoom(diff) {
  let zoom = remote.getCurrentWindow().webContents.getZoomFactor();
  remote.getCurrentWindow().webContents.setZoomFactor(zoom + diff)
}

export default class Header extends Component {
  render() {
    return (
      <div id="tracker-header">
        <h1 className="beleren header-title" >
          MTGATracker
        </h1>
        <h3 className="zoom-panel">
          <span className="zoom-out zoom" onClick={()=>adjustZoom(-0.1)}>-</span>
          /
          <span className="zoom-in zoom" onClick={()=>adjustZoom(0.1)}>+</span>
        </h3>
        <div
          id="floating-eye"
          className="no-height-contribution">
          <img className="settings-img"
            src={hideIcon}
            width="30px"
            height="30px" />
        </div>
        <div
          id="floating-history"
          className="no-height-contribution"
          onClick={()=>ipcRenderer.send('openHistory', null)}>
          <img
            className="settings-img"
            src={historyIcon}
            width="25px"
            height="25px" />
        </div>
        <div
          id="floating-settings"
          className="no-height-contribution"
          onClick={()=>ipcRenderer.send('openSettings', null)}>
          <img
            className="settings-img"
            src={settingsIcon}
            width="25px"
            height="25px" />
        </div>
      </div>
    );
  }
}
