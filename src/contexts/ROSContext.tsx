import React from 'react';
import ROSLIB from 'roslib';

export interface ROSConnection {
  url: string;
  isConnecting: boolean;
  isConnected: boolean;
}

export interface IROS {
  ros: ROSLIB.Ros;
  connection: ROSConnection;
  connect: (url: string, callback: VoidFunction) => void;
  disconnect: () => void;
}

const ROSContext = React.createContext<IROS>({} as IROS);

export default ROSContext;
