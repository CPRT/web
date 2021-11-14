import React, { useContext } from "react";
import StreamViewer from "./StreamViewer";
import CustomGamepad from "./Gamepad";
import Layout from "../components/Layout";
import ROSContext from "../contexts/ROSContext";
import Map from "./Map";
import { Grid } from "@mui/material";

function Dashboard(): React.ReactElement {
  const ros = useContext(ROSContext);

  return (
    <Layout>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={3}>
          <StreamViewer
            host={ros.connection.url}
            port={8081}
            topic="/camera/image_raw"
            quality={80}
          />
        </Grid>
        <Grid item xs={3}>
          <StreamViewer
            host={ros.connection.url}
            port={8081}
            topic="/zed2/depth/depth_registered"
            quality={80}
          />
        </Grid>
        <Grid item xs={6}>
          <Map />
        </Grid>
      </Grid>
      <CustomGamepad />
    </Layout>
  );
}

export default Dashboard;
