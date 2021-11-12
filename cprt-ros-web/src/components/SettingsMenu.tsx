import React, { useContext, useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ROSContext from "../contexts/ROSContext";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function SettingsMenu(): React.ReactElement {
  const ros = useContext(ROSContext);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleClick = (event: React.SyntheticEvent) => {
    setMenuOpen(true);
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    ros.disconnect();
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick} color="inherit">
        <SettingsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: "''",
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleDisconnect}>
          <ListItemIcon>
            <RemoveCircleIcon />
          </ListItemIcon>
          <ListItemText>Disconnect</ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
