import React from 'react';
import Events from './Events.js'

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.onClick=this.onClick.bind(this);
  }

  onClick() {
      Events.fire('onAddFrame');
  }

  render () {
    return  <div id="framesMenu"> <div className="framebutton" onClick={this.onClick}>+</div></div>;
  }
}