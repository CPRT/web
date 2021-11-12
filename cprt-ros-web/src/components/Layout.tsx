import React, { Component } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Divider, Box, List, Toolbar, IconButton, Typography, Menu, MenuItem}  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import ROSContext from '../contexts/ROSContext';

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

interface IProps {
  children?: React.ReactNode;
}
interface IState {
  drawerOpen: boolean;
  anchorEl: any;
  menuOpen: boolean;
}

const mdTheme = createTheme();

class Layout extends Component<IProps, IState> {
  static contextType = ROSContext;
  constructor(props: IProps) {
    super(props)

    this.state = {
      drawerOpen: false,
      anchorEl: null,
      menuOpen: false,
    }
  }

  handleClick(event: React.SyntheticEvent) {
    this.setState({
      anchorEl: event.currentTarget,
      menuOpen: true
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
      menuOpen: false
    });
  }

  toggleDrawer(){
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  handleDisconnect(){
    this.context.disconnect();
  }

  render(){
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={this.state.drawerOpen}>
            <Toolbar sx={{
              pr: '24px', // keep right padding when drawer closed
            }}>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.toggleDrawer.bind(this)}  sx={{
                marginRight: '36px',
                ...(this.state.drawerOpen && { display: 'none' }),
              }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" component="h1" noWrap sx={{ flexGrow: 1 }}>
                CPRT Base Station
              </Typography>
              <IconButton onClick={this.handleClick.bind(this)} color="inherit">
                <SettingsIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={this.state.drawerOpen}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={this.toggleDrawer.bind(this)}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            {this.props.children}
          </Box>
          <Menu
            anchorEl={this.state.anchorEl}
            open={this.state.menuOpen}
            onClose={this.handleClose.bind(this)}
            onClick={this.handleClose.bind(this)}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={this.handleDisconnect.bind(this)}>
              <ListItemIcon>
                <RemoveCircleIcon/>
              </ListItemIcon>
              <ListItemText>Disconnect</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </ThemeProvider>
    )
  }
}

export default Layout