import React, { useState } from 'react';
import ROSLIB from 'roslib';
import ROSContext from '../contexts/ROSContext';
import { toast } from 'react-toastify';

interface ROSProps {
  children?: React.ReactChildren;
}

export default function ROSProvider(props: ROSProps) {
  let [ros, setROS] = useState<ROSLIB.Ros>(new ROSLIB.Ros({}));
  let [url, setUrl] = useState<string>("localhost");
  let [connecting, setConnecting] = useState<boolean>(false);
  let [isConnected, setIsConnected] = useState<boolean>(false);

  ros.on('connection', () => {
    console.log('Connection Successful!')
    setConnecting(false);
    setIsConnected(true);
    toast.success('Connection Successful!', {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      pauseOnFocusLoss: false,
    });
  });

  ros.on('error', (error) => {
    console.log(error)
    localStorage.removeItem("rosServerAddress");
    setConnecting(false);
    setIsConnected(false);
    toast.error('Connection Failed.', {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      pauseOnHover: true,
    });
  });

  let connect = (url: string, callback: VoidFunction) => {
    console.log("Attemping Connection");
    toast.dismiss();
    setUrl(url);
    setConnecting(true);
    try {
      ros.connect(`ws://${url}:8080`);
      ros.on('connection', () => {
        // This isn't a great solution because an additional callback is created each time connect() is called.
        // If the connection fails twice and then succeeds on the third attempt, callback() is called 3 times.
        callback();
      })
    } catch (e) {
      console.log("Failed to create ros instance", e)
    }
  }

  let disconnect = () => {
    toast.dismiss();
    ros.close();
    setIsConnected(false);
    localStorage.removeItem("rosServerAddress");
    toast.info('Disconnected.', {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      pauseOnHover: true,
    });
  }

  return (
    <ROSContext.Provider value={
      {
        connect: connect,
        disconnect: disconnect,
        ros: ros,
        url: url,
        isConnected: isConnected,
        connecting: connecting
      }
    }>
    {props.children}
  </ROSContext.Provider>
  )
}