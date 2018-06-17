import React from 'react';
import Events from '../events/Events'
import EventType from '../events/EventType.js'
import PropertiesPanelStyle from './css/PropertiesPanel.css';
import JointProperties from './properties/JointProperties.jsx';
import FrameProperties from './properties/FrameProperties.jsx';
import Icon from './Icon.jsx';

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
        <div id="properties-title">
        <Icon name="lupe.png" size="25px"/><strong>Inspector</strong>
        </div>
        <div id="propertiescontent" key={1}>
          { this.state.display }
        </div>
       </div>
       
    </div>);
  }
}