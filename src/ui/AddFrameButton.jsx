import React from 'react';
import Events from './Events.js'
import EventType from '../events/EventType.js'
import FrameButtonStyle from './css/AddFrameButton.css'

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.onClick=this.onClick.bind(this);
  }

  onClick() {
      Events.fire(EventType.FRAME_ADD);
  }

  render () {
    return  <div id="framesMenu"> <div className="framebutton" onClick={this.onClick}>+</div></div>;
  }
}