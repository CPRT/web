import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import ROSLIB from 'roslib';
import ROSContext from '../contexts/ROSContext';
import GamepadController from './GamepadController';
import InputVisualizer from './InputVisualizer';

interface InputHandlerProps {
  contentHeight: number;
  contentWidth: number;
}

function InputHandler(props: InputHandlerProps): React.ReactElement {
  // State
  const [leftY, setLeftY] = useState<number>(0.0);
  const [rightY, setRightY] = useState<number>(0.0);
  const [controllerConnected, setControllerConnected] =
    useState<boolean>(false);

  const ros = useContext(ROSContext);
  const { contentHeight, contentWidth } = props;

  const cmdVel = new ROSLIB.Topic({
    ros: ros.ros,
    name: '/cmd_vel',
    messageType: 'geometry_msgs/Twist'
  });

  // Methods
  const sendCmdVelMsg = () => {
    const linear_vel = (leftY + rightY) / 2.0; // (m/s) TODO: Multiply by maximum speed of rover in m/s
    const angular_vel = (rightY - leftY) / 2.0; // (rad/s)
    const message = new ROSLIB.Message({
      linear: {
        x: Math.round((linear_vel + Number.EPSILON) * 100) / 100,
        y: 0,
        z: 0
      },
      angular: {
        x: 0,
        y: 0,
        z: Math.round((angular_vel + Number.EPSILON) * 100) / 100
      }
    });
    cmdVel.publish(message);
    console.log(
      'Published: ' + message.linear.x + 'm/s ' + message.angular.z + 'rad/s'
    );
  };

  useEffect(() => {
    sendCmdVelMsg(); // publish to /cmd_vel when state is updated
  });

  useEffect(() => {
    const cmd_vel_keepalive = setInterval(sendCmdVelMsg, 500);
    return () => {
      clearInterval(cmd_vel_keepalive);
    };
  }, [leftY, rightY]);

  return (
    <React.Fragment>
      <GamepadController
        leftY={leftY}
        setLeftY={setLeftY}
        rightY={rightY}
        setRightY={setRightY}
        controllerConnected={controllerConnected}
        setControllerConnected={setControllerConnected}
      />
      <InputVisualizer
        contentHeight={contentHeight}
        contentWidth={contentWidth}
        setLeftY={setLeftY}
        setRightY={setRightY}
        controllerConnected={controllerConnected}
      />
    </React.Fragment>
  );
}

export default InputHandler;
