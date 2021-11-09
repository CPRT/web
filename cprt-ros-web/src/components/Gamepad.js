import Gamepad from 'react-gamepad'
import React, { Component } from 'react';

class CustomGamepad extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          speedX: 0.0,
          speedY: 0.0,
    
          x: props.x,
          y: props.y,
    
          connected: false,
        }
      }
    
    connectHandler(gamepadIndex) {
      console.log(`Gamepad ${gamepadIndex} connected!`)
    }
  
    disconnectHandler(gamepadIndex) {
      console.log(`Gamepad ${gamepadIndex} disconnected !`)
    }

    axisChangeHandler(axisName, value, previousValue) {
      console.log(axisName, value)
    }

    buttonChangeHandler(buttonName, down) {
      console.log(buttonName, down)
    }

  render() {
    return (
      <Gamepad
        onConnect={this.connectHandler}
        onDisconnect={this.disconnectHandler}

        onButtonChange={this.buttonChangeHandler}
        onAxisChange={this.axisChangeHandler}
      >
        <React.Fragment/>
      </Gamepad>
    )
  }
}

export default CustomGamepad