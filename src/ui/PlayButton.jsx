import React from 'react';
import Events from './Events.js';
import EventType from '../events/EventType.js'

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  click() {
    Events.fire(EventType.ANIMATION_PLAY);
  }

  render () {
    return  <div id="rightMenu">
                <div id="playButton" className="framebutton" onClick={this.click}>
                    <div className="playTriangle">
                    </div>
                </div>
            </div>;
  }
}