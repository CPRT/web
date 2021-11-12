import React, { useState } from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps,  } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Toolbar, IconButton, Typography,  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsMenu from './SettingsMenu';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface HeaderProps {
  open: boolean;
  toggleOpen: VoidFunction;
}

export default function Header(props: HeaderProps) {
  return (
    <AppBar position="absolute" open={props.open}>
      <Toolbar sx={{
        pr: '24px', // keep right padding when drawer closed
      }}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.toggleOpen}  sx={{
          marginRight: '36px',
          ...(props.open && { display: 'none' }),
        }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="h1" noWrap sx={{ flexGrow: 1 }}>
          CPRT Base Station
        </Typography>
        <SettingsMenu />
      </Toolbar>
    </AppBar>
  )
}