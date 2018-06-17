import React from 'react';
import Icon from '../Icon.jsx';

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
      return (
        <div key={i} className="property-row">
        <span><Icon name="child.jpg"/>{child.jointStructure.jointName}</span>
      </div>
     );
    });
    return  (<div>
      <div className="property-row">
        <span>Name</span><span>{jointStructure.jointName}</span>
      </div>
      {children.length > 0 && <div>
            { renderedChildrenJoints }
      </div>}
   </div>);
  }
}