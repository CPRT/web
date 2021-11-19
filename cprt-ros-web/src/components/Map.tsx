import React, { ReactElement, useState } from "react";
import {
  MenuItem,
  Menu,
  Popover,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import MapGL, { Source, Layer, LayerProps, MapEvent } from "react-map-gl";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import * as GeoJSON from "geojson";
import Markers, { MarkerState } from "./MapMarkers";
import { CallbackEvent } from "react-map-gl/src/components/draggable-control";
import update from "immutability-helper";

const EMPTY_STYLE = {
  version: 8,
  sources: {},
  layers: [],
};

interface ContextMenuState {
  mouseX: number;
  mouseY: number;
  mouseLng: number;
  mouseLat: number;
}

export default function Map(): ReactElement {
  const [viewport, setViewPort] = useState({
    longitude: -110.791926,
    latitude: 38.406439,
    zoom: 12,
    minZoom: 12,
    maxZoom: 17,
  });

  const [markers, setMarkers] = useState<MarkerState[]>([]);
  const [activeMarker, setActiveMarker] = useState<number>(-1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const [latInput, setLatInput] = React.useState<number | null>(null);
  const [lngInput, setLngInput] = React.useState<number | null>(null);

  const open2 = Boolean(anchorEl2);

  const open = Boolean(anchorEl);
  const handleClick = (event: MapEvent, index: number) => {
    setAnchorEl(event.target);
    setActiveMarker(index);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveMarker(-1);
  };

  const handleClick2 = () => {
    setAnchorEl2(anchorEl);
    setAnchorEl(null);
    setLatInput(markers[activeMarker].lat);
    setLngInput(markers[activeMarker].long);
  };

  const handleCloseMenu2 = () => {
    setAnchorEl2(null);
    setActiveMarker(-1);
  };

  const [contextMenu, setContextMenu] = React.useState<ContextMenuState | null>(
    null
  );

  const handleContextMenu = (event: MapEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: (event.srcEvent as MouseEvent).clientX - 2,
            mouseY: (event.srcEvent as MouseEvent).clientY - 4,
            mouseLng: event.lngLat[0],
            mouseLat: event.lngLat[1],
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const createMarker = () => {
    if (contextMenu?.mouseLng && contextMenu.mouseLat) {
      setMarkers((prevState) => [
        ...prevState,
        { long: contextMenu.mouseLng, lat: contextMenu.mouseLat },
      ]);
    }
    handleClose();
  };

  const geojson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-110.791935, 38.406441] },
        properties: null,
      },
    ],
  };

  const layerStyle: LayerProps = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": "#007cbf",
    },
  };

  const updateMarker = (index: number, lat: number, lng: number) => {
    setMarkers((markers) =>
      update(markers, {
        [index]: {
          lat: { $set: lat },
          long: { $set: lng },
        },
      })
    );
  };

  const onDrag = (event: CallbackEvent, index: number) => {
    updateMarker(index, event.lngLat[1], event.lngLat[0]);
  };

  const removeMarker = (index: number) => {
    if (index != -1) {
      setMarkers((markers) => update(markers, { $splice: [[index, 1]] }));
    }
    handleCloseMenu();
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleCloseMenu2();
    if (latInput && lngInput) {
      updateMarker(activeMarker, latInput, lngInput);
    }
  };

  return (
    <React.Fragment>
      <MapGL
        {...viewport}
        mapStyle={EMPTY_STYLE}
        width="100%"
        height="100%"
        onViewportChange={setViewPort}
        onContextMenu={handleContextMenu}
        dragRotate={false}
        touchRotate={false}
      >
        <Source
          type="raster"
          tileSize={256}
          tiles={["http://192.168.2.51/{z}/{x}/{y}.png"]}
        >
          <Layer type="raster" minzoom={12} maxzoom={18} paint={{}} />
        </Source>
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        <Markers markers={markers} onDrag={onDrag} onClick={handleClick} />
      </MapGL>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={createMarker}>Create Marker</MenuItem>
      </Menu>
      <Popover
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleCloseMenu2}
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
                onChange={(event) =>
                  setLatInput(parseFloat(event.target.value))
                }
                size="small"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Longitude"
                value={lngInput}
                onChange={(event) =>
                  setLngInput(parseFloat(event.target.value))
                }
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
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid container>
          <Grid item>
            <IconButton onClick={() => removeMarker(activeMarker)} size="small">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClick2} size="small">
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </Popover>
    </React.Fragment>
  );
}
