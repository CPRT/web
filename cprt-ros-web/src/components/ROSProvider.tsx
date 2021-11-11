import React, { Component } from 'react';
import ROSLIB from 'roslib';
import ROSContext, {IROS} from '../contexts/ROSContext';

interface IProps {
}

interface IState {
  ros: IROS
}

class ROSProvider extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      ros: {
        ROS: new ROSLIB.Ros({}),
        url: "ws://localhost:9090",
        isConnected: false,
        ROSConfirmedConnected: false,
        autoconnect: false,
      }
    }
  }
  render() {
    return (
      <ROSContext.Provider value={{ros: this.state.ros}}>
        {this.props.children}
      </ROSContext.Provider>
    )
  }
}

export default ROSProvider;