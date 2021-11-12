import React from "react";
import ROSLIB from "roslib";

export interface IROS {
  ros: ROSLIB.Ros;
  url: string;
  connecting: boolean;
  isConnected: boolean;
  connect: (url: string, callback: VoidFunction) => void;
  disconnect: () => void;
}

const ROSContext = React.createContext<IROS>({} as IROS);

export default ROSContext;
