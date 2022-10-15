import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface ConnectButtonProps {
  connecting: boolean;
}

function ConnectButton(props: ConnectButtonProps): React.ReactElement {
  if (props.connecting) {
    return (
      <Button fullWidth disabled variant="contained">
        <CircularProgress color="inherit" size={25} />
      </Button>
    );
  }
  return (
    <Button fullWidth type="submit" variant="contained">
      Connect
    </Button>
  );
}

export default ConnectButton;
