import React, { useContext } from 'react';
import StreamViewer from './StreamViewer';
import ROSContext from '../contexts/ROSContext';
import Map from './Map';
import { Container, Grid, Paper } from '@mui/material';

function Dashboard(): React.ReactElement {
  const ros = useContext(ROSContext);

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <StreamViewer
            host={ros.connection.url}
            port={8080}
            topic="/forward_camera/image_raw"
            quality={80}
          />
        </Grid>
        <Grid item xs={3}>
          <StreamViewer
            host={ros.connection.url}
            port={8080}
            topic="/rear_camera/image_raw"
            quality={80}
          />
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 600
            }}
          >
            <Map />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
