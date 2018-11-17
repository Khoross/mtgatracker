// @flow 
import React from 'react';
import { connect } from 'react-redux';

export const SubTimer = connect(
  (store, props)=>({
    time: Math.round(store.game.timers[props.timer]/1000),
    className: store.game.timers.priority === props.priority ? 'chess-timer active' : 'chess-timer'
  })
)(
  (props) => 
    <h3 id={props.id} className={props.className}>
      {
        props.time > 3600 ?
        `${(props.time / 3600).toFixed(0).padStart(2, "0")}:${((props.time % 3600) / 60).toFixed(0).padStart(2, "0")}:${(props.time % 60).toFixed(0).padStart(2, "0")}` :
        `${(props.time / 60).toFixed(0).padStart(2, "0")}:${(props.time % 60).toFixed(0).padStart(2, "0")}`
      }
    </h3>
)

const TotalTimer = connect((store)=>({time: Math.round(store.game.timers.total/1000)}))((props) => 
  <h2 id="overall-timer">
    {
      props.time > 3600 ? 
      `${Math.floor(props.time / 3600).toFixed(0)}:${Math.floor((props.time % 3600) / 60).toFixed(0).padStart(2, "0")}:${Math.floor(props.time % 60).toFixed(0).padStart(2, "0")}` :
      `${Math.floor(props.time / 60).toFixed(0).padStart(2, "0")}:${Math.floor(props.time % 60).toFixed(0).padStart(2, "0")}`
    }
  </h2>
)

export const Timers = () => {
  return (
    <React.Fragment>
      <TotalTimer />
      <SubTimer id="hero-timer" timer="player" priority={true}/>
      <SubTimer id="opponent-timer" timer="opponent" priority={false}/>
    </React.Fragment>
  )
}