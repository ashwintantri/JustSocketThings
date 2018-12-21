import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';



class App extends Component {
  constructor()
  {
    super();
    this.state = {
      endpoint:"http://localhost:4001",
      color:'white'
    }
  }


  setColor = (color)=>{
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('change color', this.state.color);
    this.setState({color});
  }
  componentDidMount()
  {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (color) => {
      document.body.style.backgroundColor = color;
    });
  }
  render() {
    return (
      <div style={{textAlign:'center'}}>
        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>
      </div>
    );
  }
}

export default App;
