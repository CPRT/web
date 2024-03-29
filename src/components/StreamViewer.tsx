import React, { useEffect, useState, useCallback } from 'react';
import MJPEGCANVAS from 'mjpegcanvas';
import uniqueId from 'lodash/uniqueId';

interface StreamProps {
  host: string;
  port: number;
  topic: string;
  quality: number;
  invert?: boolean;
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
      height: (width * 9) / 16,
      // height: height,
      width: width,
      topic: props.topic,
      interval: 30,
      quality: props.quality,
      invert: props.invert != undefined ? props.invert : false
    });
  }, [props.host]);

  // return <div id={id} ref="child" />;
  return <div id={id} ref={div} style={{ height: '100%' }} />;
}
