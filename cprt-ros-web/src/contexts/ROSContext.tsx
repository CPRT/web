import React from 'react';

export interface IROS {
  ROS: any;
  url: string;
  isConnected: boolean;
  ROSConfirmedConnected: boolean;
  autoconnect: boolean;
}

interface IROSContext {
  ros: IROS
}

const ROSContext = React.createContext<IROSContext>({} as IROSContext);

export default ROSContext;