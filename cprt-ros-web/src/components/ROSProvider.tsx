import React, { Component } from 'react';
import ROSLIB from 'roslib';
import ROSContext from '../contexts/ROSContext';
import { toast } from 'react-toastify';


interface IProps {}

interface IState {
  ros: ROSLIB.Ros;
  url: string;
  connecting: boolean
}


class ROSProvider extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      ros: new ROSLIB.Ros({}),
      url: "localhost",
      connecting: false,
    }

    this.state.ros.on('connection', () => {
      console.log('Connection Successful!')
      this.setState({connecting: false})
      toast.success('Connection Successful!', {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        });
    });

    this.state.ros.on('error', (error) => {
      console.log(error)
      this.setState({connecting: false})
      toast.error('Connection Failed.', {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      this.state.ros.close();
    });
  }

  connect(url: string) {
    this.setState({url: url})
    console.log("Attemping Connection");
    this.setState({connecting: true})
    try {
      this.state.ros.connect(`ws://${url}:9090`);
    } catch (e) {
      console.log("Failed to create ros instance", e)
    }
  }

  render() {
    return (
      <ROSContext.Provider value={
          {
            connect: this.connect.bind(this),
            ...this.state
          }
        }>
        {this.props.children}
      </ROSContext.Provider>
    )
  }
}

export default ROSProvider;