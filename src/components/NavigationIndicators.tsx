import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import ROSContext from '../contexts/ROSContext';
import ROSLIB from 'roslib';
import { AttitudeIndicator, HeadingIndicator } from 'react-flight-indicators';
import type { Imu } from '../types/ros';

function radians_to_degrees(radians: number) {
  const pi = Math.PI;
  return radians * (180 / pi);
}

function NavigationIndicators(): React.ReactElement {
  const ros = useContext(ROSContext);
  const [roll, setRoll] = useState<number>(0.0);
  const [pitch, setPitch] = useState<number>(0.0);
  const [yaw, setYaw] = useState<number>(0.0);

  const imuData = new ROSLIB.Topic({
    ros: ros.ros,
    name: '/imu/data',
    messageType: 'sensor_msgs/msg/Imu',
    throttle_rate: 100
  });

  // const mag = new ROSLIB.Topic({
  //   ros: ros.ros,
  //   name: '/mag',
  //   messageType: 'sensor_msgs/msg/MagneticField',
  //   throttle_rate: 100
  // });

  useEffect(() => {
    const imuCallback = (msg: ROSLIB.Message) => {
      const imuMsg = msg as Imu;
      setRoll(radians_to_degrees(imuMsg.orientation.x));
      setPitch(radians_to_degrees(imuMsg.orientation.y));
      setYaw(radians_to_degrees(imuMsg.orientation.z));
    };

    imuData.subscribe(imuCallback);
    return () => {
      imuData.unsubscribe(imuCallback);
    };
  }, []);

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <AttitudeIndicator roll={roll} pitch={pitch} showBox={false} />
      <HeadingIndicator heading={yaw} showBox={false} />
    </Container>
  );
}

export default NavigationIndicators;
