import React, { Component } from 'react';
import ROSContext from '../contexts/ROSContext';
import {Navigate} from 'react-router-dom';


class RequireROS extends Component {
  static contextType = ROSContext;

  render() {
    console.log(this.context.ros)
    if(!this.context.ros.ROS.isConnected){
      return <Navigate to="/connect"/>;
    }

    return this.props.children;
  }
}

export default RequireROS;