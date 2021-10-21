import React from 'react';
import ROSLIB from 'roslib';
import StreamViewer from './components/StreamViewer';
import './App.css';
import { TextField, Button, Grid, Paper, Box }  from '@mui/material';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends React.Component {
  state = {
    connected: false,
    error: undefined,
    url: "ws://192.168.2.2:9090",
    address: "localhost",
  }

  ros = null;

  handleChange = event => this.setState({
    address: event.target.value
  })
  
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.address){
      this.setState({connected: true})
    }
  }

  handleConnect = () => {
    console.log("Attemping Connection");
    try {
      this.ros = new ROSLIB.Ros({
          url : this.state.url,
        });

      if (this.ros) this.ros.on('connection', () => {
        console.log('Connection Successful.')
        this.setState({
            connected: true,
        });
      });

      if (this.ros) this.ros.on('error', (error) => {
        console.log(error)
        this.setState({
          error: (
            <div style={{color: "rgb(161, 55, 55)", margin: 5}}>
              <div>Unable to establish connection to rosbridge server</div>
            </div>
          ),
        });
      });
    } catch (e) {
      console.log("Failed to create ros instance", e)
      this.setState({
        error: (
          <div style={{color: "rgb(161, 55, 55)", margin: 5}}>
            <div>{e.message}</div>
          </div>
        ),
      });
    }
  }

  render(){
    // if (!this.state.connected) {
      return (
        <Router>
          <Switch>
            <Route path="/ROS">
            <div>
              <StreamViewer host={this.state.address} port={8081} topic="/camera/image_raw" quality={80}/>
              <StreamViewer host={this.state.address} port={8081} topic="/zed2/depth/depth_registered" quality={80}/>
            </div>
            </Route>
          </Switch>

          <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item lg={4} md={6} sm={8}>
              <Paper>
                <Box p={1}>
                  <form onSubmit={this.handleSubmit}>
                  <Grid container direction="row" spacing={2} justifyContent="left" alignItems="center">
                    <Grid item xs={9}>
                      <TextField required fullWidth id="address" onChange={this.handleChange} value={this.state.address} label="Rover IP"/>
                    </Grid>
                    <Grid item xs={3}>
                      <Button fullWidth type="submit" variant="contained" href="ROS">Connect</Button>
                    </Grid>
                    </Grid>
                  </form>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Router>
      );
    // }
    // else
    //   return ( // Shape this to make it look nicer. But also change the button to call this instead of it just changing to this
    //     <div>
    //       <StreamViewer host={this.state.address} port={8081} topic="/camera/image_raw" quality={80}/>
    //       <StreamViewer host={this.state.address} port={8081} topic="/zed2/depth/depth_registered" quality={80}/>
    //     </div>
    //   )
  }
}

export default App;
