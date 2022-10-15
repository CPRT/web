import React, { ReactElement } from 'react';
import { Menu, MenuItem } from '@mui/material';

export interface ContextMenuState {
  mouseX: number;
  mouseY: number;
  mouseLng: number;
  mouseLat: number;
}

interface ContextMenuProps {
  contextMenu: ContextMenuState | null;
  handleCloseContextMenu: VoidFunction;
  createMarker: VoidFunction;
}

export default function MapContextMenu(props: ContextMenuProps): ReactElement {
  const { contextMenu, handleCloseContextMenu, createMarker } = props;
  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleCloseContextMenu}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      <MenuItem onClick={createMarker}>Create Marker</MenuItem>
    </Menu>
  );
}
