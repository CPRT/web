import React, { ReactElement, useState } from "react";
import MapGL, { Source, Layer, LayerProps, MapEvent } from "react-map-gl";
import * as GeoJSON from "geojson";
import Markers, { MarkerState } from "./MapMarkers";
import { CallbackEvent } from "react-map-gl/src/components/draggable-control";
import update from "immutability-helper";
import MapContextMenu, { ContextMenuState } from "./MapContextMenu";
import MarkerMenu from "./MarkerMenu";
import RoverLocation from "./RoverLocation";

const EMPTY_STYLE = {
  version: 8,
  sources: {},
  layers: [],
};

export default function Map(): ReactElement {
  const [viewport, setViewPort] = useState({
    longitude: -75.69851369243126,
    latitude: 45.38487773746181,
    zoom: 12,
    minZoom: 12,
    maxZoom: 19,
  });

  const [markers, setMarkers] = useState<MarkerState[]>([]);
  const [activeMarker, setActiveMarker] = useState<number>(-1);

  const [markerMenuAnchorEl, setMarkerMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

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

  const handleClickMarkerMenu = (event: MapEvent, index: number) => {
    setMarkerMenuAnchorEl(event.target);
    setActiveMarker(index);
  };

  const handleCloseMarkerMenu = () => {
    setMarkerMenuAnchorEl(null);
  };

  const getMarker = (index?: number) => {
    if (index != undefined) {
      return markers[index];
    }
    return markers[activeMarker];
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

  const updateMarker = (lat: number, lng: number, index?: number) => {
    setMarkers((markers) =>
      update(markers, {
        [index == undefined ? activeMarker : index]: {
          lat: { $set: lat },
          long: { $set: lng },
        },
      })
    );
  };

  const onDrag = (event: CallbackEvent, index: number) => {
    updateMarker(event.lngLat[1], event.lngLat[0], index);
  };

  const removeMarker = (index?: number) => {
    if (index != undefined) {
      setMarkers((markers) => update(markers, { $splice: [[index, 1]] }));
      return;
    }
    setMarkers((markers) => update(markers, { $splice: [[activeMarker, 1]] }));
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
          tiles={[`http://${window.location.host.split(":")[0]}:3001/tiles/{z}/{x}/{y}.png`]}
        >
          <Layer type="raster" minzoom={12} maxzoom={18} paint={{}} />
        </Source>
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        <Markers
          markers={markers}
          onDrag={onDrag}
          onClick={handleClickMarkerMenu}
        />
        <RoverLocation />
      </MapGL>
      <MapContextMenu
        createMarker={createMarker}
        contextMenu={contextMenu}
        handleCloseContextMenu={handleClose}
      />
      <MarkerMenu
        markerMenuAnchorEl={markerMenuAnchorEl}
        handleCloseMarkerMenu={handleCloseMarkerMenu}
        getMarker={getMarker}
        updateMarker={updateMarker}
        removeMarker={removeMarker}
      />
    </React.Fragment>
  );
}
