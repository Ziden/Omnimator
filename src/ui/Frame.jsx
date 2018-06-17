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
      frametype: undefined,
      isHovered: false
    }
    this.getFrameId = this.getFrameId.bind(this);
    Events.on(EventType.FRAME_SELECT, this.onFrameSelect.bind(this));
    Events.on(EventType.FRAME_CHANGETYPE, this.onFrameChangeType.bind(this));
  }

  getFrameId() {
    const frameWrapper = this.frameDiv.parentNode;
    const frameId = Array.from(frameWrapper.parentNode.children).indexOf(frameWrapper);
    return frameId;
  }

  onFrameSelect(selectedFrame) {
    this.setState({selected : selectedFrame == this.getFrameId(), frametype: this.state.frametype});
  }

  onFrameChangeType(e) {
    var frameNumber = e.frameNumber;
    if(frameNumber == this.getFrameId()) {
      var newType = e.newType;
      this.setState({frametype: newType});
    }
  }

  clickFrame() {
    Events.fire(EventType.FRAME_SELECT, this.getFrameId());
  }

  handleHover(){
    this.setState({
        isHovered: !this.state.isHovered
    });
  }
 
  render () {
    let className = 'frame fall';
    const icons = [];
    if(this.state.selected)
      icons.push('viewing');
    if(this.state.frametype)
      icons.push(this.state.frametype);//<FrameIcon id={this.state.frametype}/>);
    const renderedIcons = icons.map((Icon, i) => {return <div key={i} className={Icon}></div>});
    return <div 
      ref={ref => this.frameDiv = ref} 
      onClick={this.clickFrame} 
      onMouseEnter={this.handleHover.bind(this)} onMouseLeave={this.handleHover.bind(this)}
      className={className}>
       { renderedIcons }
      </div>;
  }
}
