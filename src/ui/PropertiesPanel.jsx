import React from 'react';
import Events from './Events.js'
import EventType from '../events/EventType.js'
import PropertiesPanelStyle from './css/PropertiesPanel.css';
import JointProperties from './properties/JointProperties.jsx';
import FrameProperties from './properties/FrameProperties.jsx';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.expand = this.expand.bind(this);
    this.state = {
      name: "Properties",
      visible: false,
      display: undefined,
      expanded: true,
    }
    Events.on(EventType.DISPLAY_PROPERTIES, this.onDisplayProperties.bind(this));
    Events.on(EventType.CLICK_NOWHERE, this.onClickNowhere.bind(this));
  }

  onDisplayProperties({type, property}) {
    this.setState(this.getPropertyState(type, property));
  }

  getPropertyState(type, property) {
    if(type === 'joint')
      return {
        display: <JointProperties joint={property}/>,
        visible: true,
        name: "Joint"
      };
    if(type === 'frame')
      return {
        display: <FrameProperties frame={property}/>,
        visible: true,
        name: "Frame"
      };
  }

  onClickNowhere() {
    this.setState({
      visible: false,
    });
  }

  expand() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render () {

    if(!this.state.visible)
      return (<div></div>);

    return  (<div>
      <div id="properties">
        <strong>{this.state.name}</strong>
        <span className="expand" onClick={this.expand}>
          {this.state.expanded ? '-' : '+'}
        </span>
        {this.state.expanded &&
        <div id="propertiescontent" key={1}>
          { this.state.display }
        </div>
        }
       </div>
       
    </div>);
  }
}