import React from 'react';
import ViewingTriangle from './ViewingTriangle.jsx' 
import Events from './Events.js'
import EventType from '../events/EventType.js'

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.clickFrame = this.clickFrame.bind(this);
  }

  clickFrame() {
      Events.fire(EventType.FRAME_SELECT, this.props.id);
  }
 
  render () {
    return <div id={this.props.id} onClick={this.clickFrame} className="frame"> { this.props.id==0 ? <ViewingTriangle/> : null }</div>;
  }
}
