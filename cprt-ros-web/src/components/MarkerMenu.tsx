import React from "react";
import { Popover, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MarkerEditMenu from "./MarkerEditMenu";
import { MarkerState } from "./MapMarkers";

interface MarkerMenuProps {
  markerMenuAnchorEl: HTMLElement | null;
  getMarker: (index?: number) => MarkerState;
  updateMarker: (lat: number, long: number, index?: number) => void;
  removeMarker: (index?: number) => void;
  handleCloseMarkerMenu: VoidFunction;
}

export default function MarkerMenu(props: MarkerMenuProps) {
  const {
    markerMenuAnchorEl,
    getMarker,
    updateMarker,
    removeMarker,
    handleCloseMarkerMenu,
  } = props;
  const open = Boolean(markerMenuAnchorEl);

  const [editMenuAnchorEl, setEditMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [latInput, setLatInput] = React.useState<number | null>(null);
  const [lngInput, setLngInput] = React.useState<number | null>(null);

  const handleClickMarkerEditMenu = () => {
    handleCloseMarkerMenu();
    setEditMenuAnchorEl(markerMenuAnchorEl);
    setLatInput(getMarker().lat);
    setLngInput(getMarker().long);
  };

  const handleCloseMarkerEditMenu = () => {
    setEditMenuAnchorEl(null);
  };

  const handleRemoveMarker = () => {
    removeMarker();
    handleCloseMarkerMenu();
  };

  return (
    <React.Fragment>
      <Popover
        anchorEl={markerMenuAnchorEl}
        open={open}
        onClose={handleCloseMarkerMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid container>
          <Grid item>
            <IconButton onClick={handleRemoveMarker} size="small">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClickMarkerEditMenu} size="small">
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </Popover>
      <MarkerEditMenu
        editMenuAnchorEl={editMenuAnchorEl}
        updateMarker={updateMarker}
        handleCloseMarkerEditMenu={handleCloseMarkerEditMenu}
        latInput={latInput}
        lngInput={lngInput}
        setLatInput={setLatInput}
        setLngInput={setLngInput}
      />
    </React.Fragment>
  );
}
