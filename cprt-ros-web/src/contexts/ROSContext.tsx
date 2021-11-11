import React from 'react';
import ROSLIB from 'roslib';

export interface IROS {
  ros: ROSLIB.Ros;
  url: string;
  connecting: boolean;
  connect: () => void;
  setUrl: (url: string) => void;
}

const ROSContext = React.createContext<IROS>({} as IROS);

export default ROSContext;