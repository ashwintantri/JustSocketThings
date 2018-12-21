import React from 'react';
import io from "socket.io-client";

export default class Chat extends React.Component{

constructor(props)
{
    super(props);
    this.state = {
        username:"",
        message:"",
        messages:[]
    }
    this.socket = io('localhost:4001');
    this.sendMessage = ev =>{
        ev.preventDefault();
        this.socket.emit('SEND_MESSAGE',{
            author:this.state.username,
            message:this.state.message
        });
        this.setState({message:''});
    }
    this.socket.on("RECEIVE_MESSAGE",function(data) {
        addMessage(data);
    });
    const addMessage = data =>{
        console.log(data);
        this.setState({messages:[...this.state.messages,data]});
        console.log(this.state.messages);
    }
}
render(){
    return(
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Global Chat</div>
                            <hr/>
                            <div className="messages">
                                {this.state.messages.map(message=>{
                                    return(<div>{message.author}:{message.message}</div>)
                                })}
                            </div>
                        </div>
                        <div className="card-footer">
                            <input type="text" placeholder = "Username" value={this.state.username} onChange={ev=>this.setState({username:ev.target.value})} className="form-control"/>
                            <br/>
                            <input type="text" placeholder = "Message" value={this.state.message} onChange={ev=>this.setState({message:ev.target.value})} className="form-control"/>
                            <br/>
                            <button className="btn btn-primary form-control" onClick={this.sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
