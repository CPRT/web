import React from 'react';
import ROSLIB from 'roslib';
import Test from './components/Test';
import './App.css';

class App extends React.Component {
  state = {
    connected: false,
    error: undefined,
    url: "ws://192.168.2.2:9090",
  }

  ros = null;

  handleConnect = () => {
    console.log("Attemping Connection");
    try {
      this.ros = new ROSLIB.Ros({
          url : this.state.url,
        });

      if (this.ros) this.ros.on('connection', () => {
        console.log('Connection Successful.')
        this.setState({
            connected: true,
        });
      });

      if (this.ros) this.ros.on('error', (error) => {
        console.log(error)
        this.setState({
          error: (
            <div style={{color: "rgb(161, 55, 55)", margin: 5}}>
              <div>Unable to establish connection to rosbridge server</div>
            </div>
          ),
        });
      });
    } catch (e) {
      console.log("Failed to create ros instance", e)
      this.setState({
        error: (
          <div style={{color: "rgb(161, 55, 55)", margin: 5}}>
            <div>{e.message}</div>
          </div>
        ),
      });
    }
  }

  render(){
    if (this.state.connected) {
      return (
        <Test ros={this.ros} topic="/chatter" type="std_msgs/String"/>
      );
    }
    else
      return (
        <button onClick={this.handleConnect} value="Connect">
          Connect
        </button>
      )
  }
}

export default App;
