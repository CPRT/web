import React, { useEffect, useState, useCallback } from 'react';
import MJPEGCANVAS from 'mjpegcanvas';
import uniqueId from 'lodash/uniqueId';

interface StreamProps {
  host: string;
  port: number;
  topic: string;
  quality: number;
}

export default function MjpegStream(props: StreamProps): React.ReactElement {
  const [id] = useState<string>(uniqueId('mjpeg-'));
  // const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const div = useCallback((node) => {
    if (node !== null) {
      // setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    new MJPEGCANVAS.Viewer({
      divID: id,
      host: props.host,
      port: props.port,
      // width: "100%",
      height: 320,
      // height: height,
      width: width,
      topic: props.topic,
      interval: 30,
      quality: props.quality
    });
  });

  // return <div id={id} ref="child" />;
  return <div id={id} ref={div} style={{ height: '100%' }} />;
}
