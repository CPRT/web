import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useContext, useState } from 'react';
import ROSContext from '../contexts/ROSContext';


export default function SettingsMenu() {
  let ros = useContext(ROSContext);
  let [anchorEl, setAnchorEl] = useState<any>(null);
  let [menuOpen, setMenuOpen] = useState<boolean>(false);

  let handleClick = (event: React.SyntheticEvent) => {
    setMenuOpen(true);
    setAnchorEl(event.currentTarget);
  }

  let handleClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  }

  let handleDisconnect = () => {
    ros.disconnect();
  }

  return (
    <React.Fragment>
      <IconButton onClick={handleClick} color="inherit">
        <SettingsIcon/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        onClick={handleClose}
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
      <MenuItem onClick={handleDisconnect}>
        <ListItemIcon>
          <RemoveCircleIcon/>
        </ListItemIcon>
        <ListItemText>Disconnect</ListItemText>
      </MenuItem>
    </Menu>
    </React.Fragment>
  )
}