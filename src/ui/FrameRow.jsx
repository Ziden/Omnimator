import React from 'react';
import Frame from './Frame.jsx'
import Events from './Events.js'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            frameDivs: []
        }
        this.frameId = 0;
        this.addFrame = this.addFrame.bind(this);
        this.setCurrentFramePointer = this.setCurrentFramePointer.bind(this);
        Events.on('onAddFrame', this.addFrame);
        Events.on('onMakeKeyframe', this.addKeyFrameIcon);
        Events.on('onFrameSelect', this.setCurrentFramePointer);
    }

    addKeyFrameIcon(frameNumber) {
        const frame = document.getElementById(frameNumber);
        let circle = frame.querySelector(".circle");
        circle = document.createElement("div");
        circle.classList += "circle";
        frame.appendChild(circle);
    }

    setCurrentFramePointer(frameNumber) {
        const triangle = document.getElementById("viewing");
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