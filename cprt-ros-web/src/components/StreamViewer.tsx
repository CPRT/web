import React, { useEffect, useState } from 'react';
import MJPEGCANVAS from 'mjpegcanvas';
import uniqueId from 'lodash/uniqueId';

interface StreamProps {
  host: string;
  port: number;
  topic: string;
  quality: number;
}

export default function MjpegStream(props: StreamProps) {
  let [id] = useState<string>(uniqueId("mjpeg-"));

  useEffect(() => {
    new MJPEGCANVAS.Viewer({
      divID : id,
      host : props.host,
      port: props.port,
      width: 320,
      height: 240,
      // height : this.refs.child.parentNode.clientHeight,
      // width : this.refs.child.parentNode.clientWidth,
      topic : props.topic,
      interval : 30,
      quality: props.quality
    })
  })
  
  return <div id={id} ref="child"/>
}