import React from 'react';
import Events from '../Events.js'
import EventType from '../../events/EventType.js'

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      joint: this.props.joint
    }
  }

  componentWillReceiveProps(props) {
    this.setState({joint: props.joint});
  }

  render () {
    const jointStructure = this.state.joint.jointStructure;
    const children = this.state.joint.connectedJointSprites;
    const renderedChildrenJoints = children.map((child, i) => {
      return (<div className="childJoint" key={i}>{child.jointStructure.jointName}</div>);
    });
    return  (<div>
      <div className="property-row">
        <span>Name</span><span>{jointStructure.jointName}</span>
      </div>

      {children.length > 0 && <div className="property-container">
          <div className="property-container-title">
             Children
          </div>
          <div className="flex">
            { renderedChildrenJoints }
          </div>
      </div>}
   </div>);
  }
}