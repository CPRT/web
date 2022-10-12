import React from "react";
import { Joystick } from "react-joystick-component";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2

interface VirtualJoystickProps {
  contentHeight: number;
  contentWidth: number;
  setLeftY: (val: number) => void;
  setRightY: (val: number) => void;
}

function VirtualJoystick(props: VirtualJoystickProps): React.ReactElement {
  const { setRightY, setLeftY } = props;

  const halfHorizontalwithSpacing =
    props.contentWidth / 2 - props.contentWidth / 12;
  const size =
    halfHorizontalwithSpacing > props.contentHeight
      ? props.contentHeight
      : halfHorizontalwithSpacing;
  return (
    <Grid2 container spacing={2}>
      <Grid2 xs={6} display="flex" justifyContent="center">
        <Joystick
          size={size}
          move={(event) => props.setLeftY((event.y || 0) / (size / 2))}
          stop={() => setLeftY(0)}
          throttle={100}
        ></Joystick>
      </Grid2>
      <Grid2 xs={6} display="flex" justifyContent="center">
        <Joystick
          size={size}
          move={(event) => props.setRightY((event.y || 0) / (size / 2))}
          stop={() => setRightY(0)}
          throttle={100}
        ></Joystick>
      </Grid2>
    </Grid2>
  );
}

export default VirtualJoystick;
