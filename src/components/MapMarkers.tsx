import React, { ReactElement } from 'react';
import { Room } from '@mui/icons-material';
import { MapEvent, Marker } from 'react-map-gl';
import { CallbackEvent } from 'react-map-gl/src/components/draggable-control';

export interface MarkerState {
  lat: number;
  long: number;
}

interface MarkersProps {
  markers: MarkerState[];
  onDrag: (event: CallbackEvent, index: number) => void;
  onClick: (event: MapEvent, index: number) => void;
}

function Markers(props: MarkersProps): ReactElement {
  const { markers, onDrag, onClick } = props;
  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={marker.long}
          latitude={marker.lat}
          // Offset to make point of marker icon align with location
          offsetLeft={-12}
          offsetTop={-24}
          draggable={true}
          onDragEnd={(event) => onDrag(event, index)}
          onClick={(event: MapEvent) => onClick(event, index)}
        >
          <Room />
        </Marker>
      ))}
    </>
  );
}

export default React.memo(Markers);
