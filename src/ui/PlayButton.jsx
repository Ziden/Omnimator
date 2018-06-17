import React from 'react';
import Events from '../events/Events';
import EventType from '../events/EventType.js'
import PlayByttonStyle from './css/PlayButton.css';

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