import React from 'react';
import MJPEGCANVAS from 'mjpegcanvas';
import uniqueId from 'lodash/uniqueId';

class StreamViewer extends React.Component {
  constructor(props) {
    super(props);
    this.id = uniqueId("mjpeg-");
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    var viewer = new MJPEGCANVAS.Viewer({
      divID : this.id,
      host : this.props.host,
      port: this.props.port,
      width: 320,
      height: 240,
      // height : this.refs.child.parentNode.clientHeight,
      // width : this.refs.child.parentNode.clientWidth,
      topic : this.props.topic,
      interval : 30,
      quality: this.props.quality
    })
  }
  
  render(){
      return <div id={this.id} ref="child"/>
  }
}

export default StreamViewer;