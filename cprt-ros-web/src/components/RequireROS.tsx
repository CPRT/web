import React, { useContext } from 'react';
import ROSContext from '../contexts/ROSContext';
import {Navigate} from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router-dom';

interface RequireROSProps {
  children?: React.ReactNode;
}

function RequireROS(props: RequireROSProps) {
  const ros = useContext(ROSContext);
  const location = useLocation();
  let navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  const savedAddress = localStorage.getItem("rosServerAddress");
  if(ros.connecting){
    return (
      <React.Fragment/>
    )
  }

  if(!ros.isConnected){
    if(savedAddress){
      ros.connect(savedAddress, () => {
        navigate(from, {replace: true});
      });
      return (
        <React.Fragment/>
      )
    }
    return <Navigate to="/connect" state={{ from: location }}/>;
  }

  // TODO: Check for errors/disconnections and create modal/popup of alerts

  return props.children;
}

export default RequireROS;