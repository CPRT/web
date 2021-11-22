import React, { useContext, useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import ROSLIB from "roslib";
import ROSContext from "../contexts/ROSContext";
import { Room } from "@mui/icons-material";
import type { ROSLIB as ROS } from "../types/roslib";

const GPSTOPIC = "/sensors/gps";

interface Coordinate {
  lat: number;
  lng: number;
}

export default function RoverLocation() {
  const ros = useContext(ROSContext);
  const [roverPosition, setRoverPosition] = useState<Coordinate | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const gpsCallback = (message: ROSLIB.Message) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setRoverPosition({
      lat: (message as ROS.NavSatFix).latitude,
      lng: (message as ROS.NavSatFix).longitude,
    });
    //If another message isn't received within 10s, reset the position
    setTimeoutId(setTimeout(() => setRoverPosition(null), 10000));
  };

  const roverGps = new ROSLIB.Topic({
    ros: ros.ros,
    name: GPSTOPIC,
    messageType: "sensor_msgs/NavSatFix",
  });

  useEffect(() => {
    roverGps.subscribe(gpsCallback);
    return () => roverGps.unsubscribe();
  });

  if (roverPosition) {
    return (
      <Marker
        key={`rover-pos`}
        longitude={roverPosition.lng}
        latitude={roverPosition.lat}
        offsetLeft={-12}
        offsetTop={-24}
      >
        <Room style={{ fill: "red" }} />
      </Marker>
    );
  }
  return <React.Fragment />;
}
