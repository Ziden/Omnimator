import React from 'react';
import Events from './Events.js'
import EventType from '../events/EventType.js'
import FramesStyles from './css/Frames.css';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.clickFrame = this.clickFrame.bind(this);
    this.state = {
      selected: false,
      frametype: undefined
    }
    Events.on(EventType.FRAME_SELECT, this.onFrameSelect.bind(this));
    Events.on(EventType.FRAME_CHANGETYPE, this.onFrameChangeType.bind(this));
  }

  onFrameSelect(selectedFrame) {
    this.setState({selected : selectedFrame == this.props.id, frametype: this.state.frametype});
  }

  onFrameChangeType(e) {
    var frameNumber = e.frameNumber;
    if(frameNumber == this.props.id) {
      var newType = e.newType;
      this.setState({frametype: newType});
    }
  }

  clickFrame() {
      Events.fire(EventType.FRAME_SELECT, this.props.id);
  }
 
  render () {
    const icons = [];
    if(this.state.selected)
      icons.push('viewing');
    if(this.state.frametype)
      icons.push(this.state.frametype);//<FrameIcon id={this.state.frametype}/>);
    const renderedIcons = icons.map((Icon, i) => {return <div key={i} className={Icon}></div>});
    return <div id={this.props.id} onClick={this.clickFrame} className="frame"> { renderedIcons }</div>;
  }
}
