import React from 'react';
import ROSLIB from 'roslib';
import StreamViewer from './components/StreamViewer';
import CustomGamepad from './components/Gamepad';
import './App.css';
import Layout from './components/Layout.tsx';
import ROSContext from './contexts/ROSContext';

class App extends React.Component {
  static contextType = ROSContext;
  state = {
    connected: false,
    error: undefined,
    url: "ws://192.168.2.2:9090",
    address: "localhost",
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
    // if (!this.state.connected) {
      if(this.context.ros.ROS.isConnected){
        return (
              <div>
                <Layout/>
                <StreamViewer host={this.state.address} port={8081} topic="/camera/image_raw" quality={80}/>
                <StreamViewer host={this.state.address} port={8081} topic="/zed2/depth/depth_registered" quality={80}/>
                <CustomGamepad ros={this.ros}/>
              </div>
        );
      }
    else{
      return (
        <Layout/>
      )
    }
  }
}

export default App;
