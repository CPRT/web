import React, { useContext } from 'react';
import { TextField, Grid, Paper, Box } from '@mui/material';
import ROSContext from '../contexts/ROSContext';
import ConnectButton from './ConnectButton';
import { useNavigate, useLocation } from 'react-router-dom';

function Connect(): React.ReactElement {
  // Context
  const navigate = useNavigate();
  const location = useLocation();
  const ros = useContext(ROSContext);

  // State
  const [address, setAddress] = React.useState<string>(
    window.location.host.split(':')[0] //Set the address serving the page as the default ROS server address
  );
  const from = location.state?.from?.pathname || '/';

  // Methods
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (address) {
      localStorage.setItem('rosServerAddress', address);
      ros.connect(address, () => {
        navigate(from, { replace: true });
      });
    }
  };

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setAddress(target.value);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item lg={4} md={6} sm={8}>
        <Paper>
          <Box p={1}>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                direction="row"
                spacing={2}
                justifyContent="left"
                alignItems="center"
              >
                <Grid item xs={9}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    onChange={handleChange}
                    value={address}
                    label="Rover IP"
                  />
                </Grid>
                <Grid item xs={3}>
                  <ConnectButton connecting={ros.connection.isConnecting} />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Connect;
