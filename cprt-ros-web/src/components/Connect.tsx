import React, { Component } from 'react';
import { TextField, Grid, Paper, Box}  from '@mui/material';
import ROSContext from '../contexts/ROSContext';
import ConnectButton from './ConnectButton';

interface IProps {
}
interface IState {
  address: string;
}

class Connect extends Component<IProps, IState> {
  static contextType = ROSContext;
  constructor(props: IProps) {
    super(props)

    this.state = {
      address: "localhost",
    }
  }

  handleChange(e: React.SyntheticEvent){
    let target = e.target as HTMLInputElement;
    this.setState({address: target.value})
  }

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (this.state.address){
      this.context.connect(this.state.address);
    }
  }

  render() {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item lg={4} md={6} sm={8}>
          <Paper>
            <Box p={1}>
              <form onSubmit={this.handleSubmit.bind(this)}>
              <Grid container direction="row" spacing={2} justifyContent="left" alignItems="center">
                <Grid item xs={9}>
                  <TextField required fullWidth id="address" onChange={this.handleChange.bind(this)} value={this.state.address} label="Rover IP"/>
                </Grid>
                <Grid item xs={3}>
                  <ConnectButton connecting={this.context.connecting}/>
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

export default Connect