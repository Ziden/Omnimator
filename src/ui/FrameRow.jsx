import React from 'react';
import Frame from './Frame.jsx'
import Events from './Events.js'
import EventType from '../events/EventType.js';
import ViewingTriangleStyle from './css/ViewingTriangle.css';
import FrameLineStyle from './css/FrameLine.css';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frameDivs: []
        }
        this.frameId = 0;
        this.addFrame = this.addFrame.bind(this);
        Events.on(EventType.FRAME_ADD, this.addFrame);
    }

    onComponentDidMount() {
        Events.fire(EventType.FRAME_SELECT, 0);
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