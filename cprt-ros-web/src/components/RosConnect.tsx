import React, { Component } from 'react';
import { TextField, Button, Grid, Paper, Box}  from '@mui/material';

interface IProps {
}
interface IState {
  address: string;
  connected: boolean;
}

class RosConnect extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      address: "localhost",
      connected: false
    }
  }

  handleChange(e: React.SyntheticEvent){
    let target = e.target as HTMLInputElement;
    this.setState({address: target.value})
  }

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (this.state.address){
      // do connection here
      this.setState({connected: true})
    }
  }

  render() {
    return (
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
    )
  }
}

export default RosConnect