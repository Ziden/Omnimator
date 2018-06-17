import React from 'react';

export default class Icon extends React.Component {

  constructor(props) {
    super(props);
    this.style = {
      width: '14px',
      marginRight: '5px',
      marginLeft: '5px'
    }
  }

  render () {
    const src = './src/ui/img/'+this.props.name;
    return (
      <img className="icon" style={this.style} src={src}></img>
    );
  }
}

