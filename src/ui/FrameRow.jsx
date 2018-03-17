import React from 'react';
import Frame from './Frame.jsx'
import Events from './Events.js'
import EventType from '../events/EventType.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            frameDivs: []
        }
        this.frameId = 0;
        this.addFrame = this.addFrame.bind(this);
        this.setCurrentFramePointer = this.setCurrentFramePointer.bind(this);
        Events.on(EventType.FRAME_ADD, this.addFrame);
        Events.on(EventType.FRAME_CHANGETYPE, this.addKeyFrameIcon);
        Events.on(EventType.FRAME_SELECT, this.setCurrentFramePointer);
    }

    addKeyFrameIcon(e) {
        var frameNumber = e.frameNumber;
        var newType = e.newType;

        const frame = document.getElementById(frameNumber);
        frame.innerHTML = '';
        if(newType=='key') {
            const circle = document.createElement("div");
            circle.classList += "circle";
            frame.appendChild(circle);
        } else if(newType=='interpolation') {
            const line = document.createElement("div");
            line.classList += "line";
            frame.appendChild(line);
        }
        
    }

    setCurrentFramePointer(frameNumber) {
        let triangle = document.getElementById("viewing");
        if(!triangle) {
            triangle = document.createElement("div");
            triangle.id = "viewing";
        }
        const frameDiv = document.getElementById(frameNumber);
        frameDiv.appendChild(triangle);
    }

    addFrame(e) {
        const divs = this.state.frameDivs;
        divs.push(<Frame id={this.frameId} events={this.props.events}/>);
        this.setState({
            frameDivs: divs
        });
        this.frameId++;
    }

    render() {
        const frames =this.state.frameDivs.map((Frame, i) => {return <div key={i}>{Frame}</div>});
        return <div className = "frameRow"> { frames } </div>
    }
}