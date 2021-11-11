import Gamepad from 'react-gamepad'
import React, { Component } from 'react';
import ROSContext from '../contexts/ROSContext';
import ROSLIB from 'roslib';

class CustomGamepad extends Component {
    static contextType = ROSContext;
    constructor(props) {
      super(props)

      this.ros = props.ros;
      this.cmdVel = new ROSLIB.Topic({
        ros: this.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist',
        throttle_rate: 100 //100ms timeout; Don't send messages more than 10/second
      })

      this.state = {
        leftY: 0.0,
        rightY: 0.0,
  
        connected: false,
      }
    }

    componentDidMount(){
      this.setState({interval: setInterval(() => {
        this.sendCmdVelMsg();
      }, 100)})//Send message every 100ms
    }

    componentWillUnmount(){
      clearInterval(this.state.interval);
    }

    sendCmdVelMsg(){
      const linear_vel = (this.state.leftY + this.state.rightY) / 2.0 // (m/s) TODO: Multiply by maximum speed of rover in m/s
      const angular_vel = (this.state.rightY - this.state.leftY) / 2.0 // (rad/s)
      const message = new ROSLIB.Message({
        linear: {
          x: linear_vel,
          y: 0,
          z: 0
        },
        angular: {
          x: 0,
          y: 0,
          z: angular_vel,
        }
      })
      this.cmdVel.publish(message);
    }
    
    connectHandler() {
      console.log(`Controller connected!`)
      this.setState({
        connected: true
      })
    }
  
    disconnectHandler() {
      console.log(`Controller disconnected !`)

      this.setState({
        connected: false
      })
      const message = new ROSLIB.Message({
        linear: {
          x: 0,
          y: 0,
          z: 0
        },
        angular: {
          x: 0,
          y: 0,
          z: 0
        }
      })
      this.cmdVel.publish(message)
    }

    axisChangeHandler(axisName, value, previousValue) {
      console.log(axisName, value)
      if (axisName === 'LeftStickY') {
        this.setState({
          leftY: value
        })
      } else if (axisName === 'RightStickY') {
        this.setState({
          rightY: value
        })
      }
      this.sendCmdVelMsg();
    }

    buttonChangeHandler(buttonName, down) {
      console.log(buttonName, down)
    }

  render() {
    return (
      <Gamepad
        onConnect={this.connectHandler.bind(this)}
        onDisconnect={this.disconnectHandler.bind(this)}

        onButtonChange={this.buttonChangeHandler.bind(this)}
        onAxisChange={this.axisChangeHandler.bind(this)}
      >
        <React.Fragment/>
      </Gamepad>
    )
  }
}

export default CustomGamepad