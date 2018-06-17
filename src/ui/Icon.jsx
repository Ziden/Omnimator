import React from 'react';

export default class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      width: '14px',
      height: '14px',
      marginRight: '5px',
      marginLeft: '5px'
    }
  }

  render () {
    const src = './src/ui/img/'+this.props.name;
    const style = Object.assign({}, this.style);
    if(this.props.size) {
      style.width = this.props.size;
      style.height = this.props.size;
    }
    return (
      <img className="icon" style={style} src={src}></img>
    );
  }
}

