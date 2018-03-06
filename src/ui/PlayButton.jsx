import React from 'react';
import Events from './Events.js';

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  click() {
    Events.fire("onAnimationPlay");
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