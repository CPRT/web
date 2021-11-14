import React, { ReactElement, useState } from "react";
import MapGL, { Source, Layer, LayerProps } from "react-map-gl";
import * as GeoJSON from "geojson";

const EMPTY_STYLE = {
  version: 8,
  sources: {},
  layers: [],
};

export default function Map(): ReactElement {
  const [viewport, setViewPort] = useState({
    longitude: -110.791926,
    latitude: 38.406439,
    zoom: 12,
    minZoom: 12,
    maxZoom: 17,
  });

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

  return (
    <MapGL
      {...viewport}
      mapStyle={EMPTY_STYLE}
      width="100%"
      height="100%"
      onViewportChange={setViewPort}
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
    </MapGL>
  );
}
