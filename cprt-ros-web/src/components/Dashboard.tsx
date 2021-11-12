import React, {Component} from 'react';
import StreamViewer from './StreamViewer';
import CustomGamepad from './Gamepad';
import Layout from '../components/Layout';
import ROSContext from '../contexts/ROSContext';

interface IProps {};

interface IState {}

class Dashboard extends Component<IProps, IState> {
  static contextType = ROSContext;
  constructor(props: IProps){
    super(props);
    this.state = {}
  }

  render(){
    return (
      <Layout>
        <StreamViewer host={this.context.url} port={8081} topic="/camera/image_raw" quality={80}/>
        <StreamViewer host={this.context.url} port={8081} topic="/zed2/depth/depth_registered" quality={80}/>
        <CustomGamepad />
      </Layout>
    );
  }
}

export default Dashboard;
