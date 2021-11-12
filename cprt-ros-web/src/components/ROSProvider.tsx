import React, { Component } from 'react';
import ROSLIB from 'roslib';
import ROSContext from '../contexts/ROSContext';
import { toast } from 'react-toastify';


interface IProps {}

interface IState {
  ros: ROSLIB.Ros;
  url: string;
  connecting: boolean
  isConnected: boolean;
}


class ROSProvider extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      ros: new ROSLIB.Ros({}),
      url: "localhost",
      connecting: false,
      isConnected: false,
    }

    this.state.ros.on('connection', () => {
      console.log('Connection Successful!')
      this.setState({
        connecting: false,
        isConnected: true
      })
      toast.success('Connection Successful!', {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
      });
    });

    this.state.ros.on('error', (error) => {
      console.log(error)
      localStorage.removeItem("rosServerAddress");
      this.setState({
        connecting: false,
        isConnected: false 
      })
      toast.error('Connection Failed.', {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        pauseOnHover: true,
      });
    });
  }

  connect(url: string, callback: VoidFunction) {
    console.log("Attemping Connection");
    toast.dismiss();
    this.setState({
      url: url,
      connecting: true
    })
    try {
      this.state.ros.connect(`ws://${url}:8080`);
      this.state.ros.on('connection', () => {
        // This isn't a great solution because an additional callback is created each time connect() is called.
        // If the connection fails twice and then succeeds on the third attempt, callback() is called 3 times.
        callback();
      })

    } catch (e) {
      console.log("Failed to create ros instance", e)
    }
  }

  disconnect() {
    toast.dismiss();
    this.state.ros.close();
    this.setState({
      isConnected: false
    })
    localStorage.removeItem("rosServerAddress");
    toast.info('Disconnected.', {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      pauseOnHover: true,
    });
  }

  render() {
    return (
      <ROSContext.Provider value={
          {
            connect: this.connect.bind(this),
            disconnect: this.disconnect.bind(this),
            ...this.state
          }
        }>
        {this.props.children}
      </ROSContext.Provider>
    )
  }
}

export default ROSProvider;