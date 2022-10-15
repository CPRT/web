import React from 'react';
import VirtualJoystick from './VirtualJoystick';

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

interface InputVisualizerProps {
  contentHeight: number;
  contentWidth: number;
  setLeftY: (val: number) => void;
  setRightY: (val: number) => void;
  controllerConnected: boolean;
}

function InputVisualizer(props: InputVisualizerProps): React.ReactElement {
  const {
    contentHeight,
    contentWidth,
    controllerConnected,
    setLeftY,
    setRightY
  } = props;
  if (controllerConnected) {
    return <div>Gamepad</div>;
  } else if (isTouchDevice()) {
    return (
      <VirtualJoystick
        contentHeight={contentHeight}
        contentWidth={contentWidth}
        setLeftY={setLeftY}
        setRightY={setRightY}
      />
    );
  } else {
    return <div>Keyboard</div>;
  }
}

export default InputVisualizer;
