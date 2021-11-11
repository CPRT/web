import React, { Component } from 'react';
import { Button, CircularProgress }  from '@mui/material';


interface ConnectButtonProps {
  connecting: boolean;
}

interface ConnectButtonState {}

class ConnectButton extends Component<ConnectButtonProps, ConnectButtonState> {
  render() {
    if (!this.props.connecting){
      return (
        <Button fullWidth type="submit" variant="contained">Connect</Button>
      )
    }
    return (
      <Button fullWidth disabled variant="contained">
        <CircularProgress color="inherit" size={25}/>
      </Button>
    )
  }
}

export default ConnectButton;