import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './Sidebar';
import { Box, Toolbar } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const mdTheme = createTheme();

function Layout(): React.ReactElement {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header open={drawerOpen} toggleOpen={toggleDrawer} />
        <Sidebar open={drawerOpen} toggleOpen={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Outlet context={drawerOpen} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
