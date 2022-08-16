import React, { useEffect, useState } from "react";
import ROSLIB from "roslib";
import ROSContext, { ROSConnection } from "../contexts/ROSContext";
import { toast } from "react-toastify";

interface ROSProps {
  children?: React.ReactChildren;
}

// Implements the React Context API to be able to inject the ROSLIB.Ros
// object into any component that need it
export default function ROSProvider(props: ROSProps): React.ReactElement {
  const [ros] = useState<ROSLIB.Ros>(new ROSLIB.Ros({}));
  const [connection, setConnection] = useState<ROSConnection>({
    url: "localhost",
    isConnected: false,
    isConnecting: false,
  });

  //Create callbacks to notify on connection or connection failure.
  // [] at the end of the useEffect call ensures the callbacks are only created once
  useEffect(() => {
    // 'connection' callback is called when a successful connection is established to ROS server
    ros.on("connection", () => {
      console.log("Connection Successful!");
      setConnection({
        ...connection,
        isConnected: true,
        isConnecting: false,
      });
      toast.success("Connection Successful!", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        draggable: false,
      });
    });

    // 'error' is called when an error occurs during the connection process
    // Note: 'error' is not called for broken connections
    ros.on("error", (error) => {
      console.log(error);
      localStorage.removeItem("rosServerAddress");
    });

    // 'close' callback is called whenever the connection to the ROS server is closed
    // The e.wasClean flag can be used to determine whether the connection was closed gracefully.
    ros.on("close", (e) => {
      toast.dismiss();
      if (e.wasClean) {
        console.log("Disconnected.");
        setConnection({
          ...connection,
          isConnected: false,
          isConnecting: false,
        });
        toast.info("Disconnected.", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: true,
          draggable: false,
        });
      } else {
        setConnection({
          ...connection,
          isConnected: false,
          isConnecting: false,
        });
        toast.error("Connection Failed.", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: true,
          draggable: false,
        });
      }
    });
  }, []);

  const connect = (url: string, callback: VoidFunction) => {
    console.log("Attemping Connection");
    setConnection({
      ...connection,
      url: url,
      isConnecting: true,
    });
    try {
      ros.connect(`ws://${url}:9090`);
      ros.on("connection", () => {
        // This isn't a great solution because an additional callback is created each time connect() is called.
        // If the connection fails twice and then succeeds on the third attempt, callback() is called 3 times.
        callback();
      });
    } catch (e) {
      console.log("Failed to create ros instance", e);
    }
  };

  const disconnect = () => {
    ros.close();
    localStorage.removeItem("rosServerAddress");
  };

  return (
    <ROSContext.Provider
      value={{
        connect: connect,
        disconnect: disconnect,
        ros: ros,
        connection: connection,
      }}
    >
      {props.children}
    </ROSContext.Provider>
  );
}
