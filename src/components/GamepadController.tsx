import Gamepad from "react-gamepad";
import React from "react";

interface GamepadProps {
  leftY: number;
  setLeftY: (val: number) => void;
  rightY: number;
  setRightY: (val: number) => void;
  controllerConnected: boolean;
  setControllerConnected: (val: boolean) => void;
}

function GamepadController(props: GamepadProps): React.ReactElement {
  // State
  const { setLeftY, setRightY, setControllerConnected } = props;

  const connectHandler = () => {
    console.log(`Controller connected!`);
    setControllerConnected(true);
  };

  const disconnectHandler = () => {
    console.log(`Controller disconnected !`);
    setControllerConnected(false);

    setLeftY(0);
    setRightY(0);
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

export default GamepadController;
