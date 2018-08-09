import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FrameRow from './FrameRow.jsx';
import Header from './Header.jsx';
import {
  render
} from 'react-dom'
import AddFrameButton from './AddFrameButton.jsx'
import PlayButton from './PlayButton.jsx'
import PropertiesPanel from './PropertiesPanel.jsx'

class ReactIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div id="main">
        <ToastContainer/>
        <Header/>
        <PropertiesPanel/>
        <div id="frames">
          <AddFrameButton />
          <FrameRow/>
          <PlayButton/>
        </div>
      </div>
      
    );
  }
}

const renderUI = () => {
  let ui = undefined;
  render(<ReactIndex ref={e => ui = e}/>, document.getElementById('ui'));
  return ui;
}


module.exports = { UI:ReactIndex, renderUI: renderUI };