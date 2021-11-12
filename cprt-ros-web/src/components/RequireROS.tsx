import React, { useContext, useEffect } from "react";
import ROSContext from "../contexts/ROSContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

interface RequireROSProps {
  children?: React.ReactNode;
}

function RequireROS(props: RequireROSProps): React.ReactElement {
  const ros = useContext(ROSContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const savedAddress = localStorage.getItem("rosServerAddress");

  useEffect(() => {
    if (
      !ros.connection.isConnecting &&
      !ros.connection.isConnected &&
      savedAddress
    ) {
      ros.connect(savedAddress, () => {
        navigate(from, { replace: true });
      });
    }
  });

  if (ros.connection.isConnecting) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (!ros.connection.isConnected) {
    if (savedAddress && !ros.connection.isConnecting) {
      // ros.connect(savedAddress, () => {
      //   navigate(from, { replace: true });
      // });
      return <React.Fragment />;
    }
    return <Navigate to="/connect" state={{ from: location }} />;
  }

  // TODO: Check for errors/disconnections and create modal/popup of alerts

  return <React.Fragment>{props.children}</React.Fragment>;
}

export default RequireROS;
