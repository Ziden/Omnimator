import React from 'react';
import Frame from './Frame.jsx'
import Events from './Events.js'
import EventType from '../events/EventType.js';
import ViewingTriangleStyle from './css/ViewingTriangle.css';
import FrameLineStyle from './css/FrameLine.css';
import {
  render
} from 'react-dom'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frameDivs: []
        }
        this.frameId = 0;
        Events.on(EventType.FRAME_ADD, this.addFrame.bind(this));
        Events.on(EventType.FRAME_SELECT, this.frameSelect.bind(this));
    }

    frameSelect(frameIndex) {
        this.selectedFrame = frameIndex;
    }

    addFrame(e) {
        const newId = this.selectedFrame + 1;
        const frameRow = document.querySelector('.frameRow');
        const newFrameDiv = document.createElement("div");
        if(frameRow.children.length==0) 
            frameRow.appendChild(newFrameDiv);
        else {
            const nextFrame = frameRow.children[newId];
            frameRow.insertBefore(newFrameDiv, nextFrame);
        }
        render(<Frame/>, newFrameDiv);
    }

    render() {
       // const frames =this.state.frameDivs.map((Frame, i) => {return <div key={i}>{Frame}</div>});
        return <div className = "frameRow"> </div>
    }
}