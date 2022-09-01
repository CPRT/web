import React from "react";
import { Popover, Grid, IconButton, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface MarkerEditMenuProps {
  editMenuAnchorEl: HTMLElement | null;
  handleCloseMarkerEditMenu: VoidFunction;
  updateMarker: (lat: number, long: number, index?: number) => void;
  latInput: number | null;
  lngInput: number | null;
  setLatInput: (lat: number | null) => void;
  setLngInput: (lng: number | null) => void;
}

export default function MarkerEditMenu(
  props: MarkerEditMenuProps
): React.ReactElement {
  const {
    latInput,
    lngInput,
    editMenuAnchorEl,
    updateMarker,
    setLatInput,
    setLngInput,
    handleCloseMarkerEditMenu,
  } = props;

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleCloseMarkerEditMenu();
    if (latInput && lngInput) {
      updateMarker(latInput, lngInput);
    }
  };

  const open = Boolean(editMenuAnchorEl);

  return (
    <Popover
      anchorEl={editMenuAnchorEl}
      open={open}
      onClose={handleCloseMarkerEditMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      PaperProps={{
        style: { width: 250 },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid
          container
          padding={1}
          spacing={1}
          columns={5}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={2}>
            <TextField
              label="Latitude"
              value={latInput}
              onChange={(event) => setLatInput(parseFloat(event.target.value))}
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Longitude"
              value={lngInput}
              onChange={(event) => setLngInput(parseFloat(event.target.value))}
              size="small"
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton size="medium" type="submit">
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </Popover>
  );
}
