import React from 'react';
import Icon from '../Icon.jsx';
import { onDragUpdate as jointUpdate } from '../../editor/JointFunctions.js';
import { ToastContainer, toast } from 'react-toastify';
import ImageHandler from '../../util/ImageHandler';
import Events from '../../events/Events';
import EventTypes from '../../events/EventType';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bone: this.props.bone,
      length: this.props.bone.height
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
        bone: props.bone,
        length: props.bone.height
    });
  }

  componentDidMount() {
    const boneImage = this.state.bone.key;
    const domImage = window.game.cache.getImage(boneImage);
    this.boneImageDiv.appendChild(domImage)
  }

  onChangeHeight(event) {
    const newValue = event.target.value;
    const newState = {length: newValue};
    this.setState(newState);
    Events.fire(EventTypes.BONE_UPDATE, this.state);
  }

  onSelectSprite(event) {
    const file = event.target.files[0];
    console.log(file);
    const extension = file.name.split('.').pop();
    if(extension !== 'png') {
      toast.error("Only .png images are accepted", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    ImageHandler.loadImageToSprite(file, this.state.bone);
  }

  render () {
    return  (<div>
     <strong>Bone</strong>

      <div className="property-row">
        <span>Image</span>
      </div>

      <label htmlFor="fileInput">
        <div className='image-box' ref={e => this.boneImageDiv = e}>
        </div>
      </label>

      <div className="property-row">
        <span>Length</span><input type="number" value={this.state.length} onChange={this.onChangeHeight.bind(this)}/>
      </div>

      <input type="file" id="fileInput" onChange={this.onSelectSprite.bind(this)}/>
   </div>);
  }
}