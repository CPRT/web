import Gamepad from "react-gamepad";
import React, { useContext, useState, useEffect } from "react";
import ROSContext from "../contexts/ROSContext";
import ROSLIB from "roslib";

function CustomGamepad(): React.ReactElement {
  const ros = useContext(ROSContext);

  const cmdVel = new ROSLIB.Topic({
    ros: ros.ros,
    name: "/cmd_vel",
    messageType: "geometry_msgs/Twist",
    throttle_rate: 100, //100ms timeout; Don't send messages more than 10/second
  });

  // State
  const [leftY, setLeftY] = useState<number>(0.0);
  const [rightY, setRightY] = useState<number>(0.0);
  const [controllerConnected, setControllerConnected] =
    useState<boolean>(false);

  // Lifecycle
  useEffect(() => {
    const interval = setInterval(() => {
      sendCmdVelMsg();
    }, 100); //Send message every 100ms
    return () => clearInterval(interval);
  });

  // Methods
  const sendCmdVelMsg = () => {
    const linear_vel = (leftY + rightY) / 2.0; // (m/s) TODO: Multiply by maximum speed of rover in m/s
    const angular_vel = (rightY - leftY) / 2.0; // (rad/s)
    const message = new ROSLIB.Message({
      linear: {
        x: linear_vel,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: angular_vel,
      },
    });
    cmdVel.publish(message);
  };

  const connectHandler = () => {
    console.log(`Controller connected!`);
    setControllerConnected(true);
  };

  const disconnectHandler = () => {
    console.log(`Controller disconnected !`);
    setControllerConnected(false);

    const message = new ROSLIB.Message({
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      },
    });
    cmdVel.publish(message);
  };

  const axisChangeHandler = (axisName: string, value: number) => {
    if (axisName === "LeftStickY") {
      setLeftY(value);
    } else if (axisName === "RightStickY") {
      setRightY(value);
    }
  };

  // Render
  return (
    <Gamepad
      onConnect={connectHandler}
      onDisconnect={disconnectHandler}
      onAxisChange={axisChangeHandler}
    >
      <React.Fragment />
    </Gamepad>
  );
}

export default CustomGamepad;
