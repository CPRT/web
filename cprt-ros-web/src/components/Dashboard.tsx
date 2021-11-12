import React, { useContext } from "react";
import StreamViewer from "./StreamViewer";
import CustomGamepad from "./Gamepad";
import Layout from "../components/Layout";
import ROSContext from "../contexts/ROSContext";

function Dashboard(): React.ReactElement {
  const ros = useContext(ROSContext);

  return (
    <Layout>
      <StreamViewer
        host={ros.url}
        port={8081}
        topic="/camera/image_raw"
        quality={80}
      />
      <StreamViewer
        host={ros.url}
        port={8081}
        topic="/zed2/depth/depth_registered"
        quality={80}
      />
      <CustomGamepad />
    </Layout>
  );
}

export default Dashboard;
