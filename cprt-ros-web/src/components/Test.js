import React from 'react';
import ROSLIB from 'roslib';

class Test extends React.Component {
    subscriber = new ROSLIB.Topic({
        ros: this.props.ros,
        name: this.props.topic,
        messageType: this.props.type,
    })

    state = {
        message: String,
    }

    componentDidMount = () => {
        this.subscribe();
    }

    componentWillUnmount = () => {
        this.subscriber.unsubscribe();
    }

    subscribe = () => {
        this.subscriber.subscribe((message) => {
          this.setState(() => ({
            message: message,
          }));
        });
    }
    
    render(){
        if (this.state.message){
            return (
                <p>{this.state.message.data}</p>
            )
        }
        
    }
}

export default Test;