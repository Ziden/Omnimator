import React from 'react';
import Icon from '../Icon.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: this.props.frame
    }
  }

  componentWillReceiveProps(props) {
    console.log(props.frame);
    this.setState({frame: props.frame});
  }

  render () {
    const frame = this.state.frame;
    return  (<div>
      
      <div className="property-row">
        <span>Number</span><span>{frame.id}</span>
      </div>

      {frame.type == 'key' && <div>
        <div className="property-row">
          <span><Icon name="icon_key.png"/>Key Frame</span>
        </div>
      </div>}

      {frame.type == 'Interpolation' && <div>
        <div className="property-row">
          <span><Icon name="interpolation.jpg"/>Interpolation Frame</span>
        </div>
      </div>}
   </div>);
  }
}