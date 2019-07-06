import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const socket = new WebSocket("ws://localhost:3001");

class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: {name: "Anonymous"},
      numberOfClients: 0,
      messages : []
    };

    this.onNewMessage = this.onNewMessage.bind(this);
    this.onIncomingMessage = this.onIncomingMessage.bind(this);
    this.onIncomingNotification = this.onIncomingNotification.bind(this);
    this.onIncomingClientInfo = this.onIncomingClientInfo.bind(this);

  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    socket.onopen = () => {
      console.log("Made a new connection");
      socket.send("A new connection appears...");
    };
    
    socket.onmessage = (content) => {
      content = JSON.parse(content.data)
      switch(content.type){
        case "incomingMessage":
          this.onIncomingMessage(content)
          break;

        case "incomingNotification":
          this.onIncomingNotification(content)
          break;
        case "incomingClientInfo":
          this.onIncomingClientInfo(content)
          break;
      }
      
    };
    
    socket.onclose = () => {
      alert("Socket is closed.");
    };
  }

  onIncomingMessage(content){
    if (this.refs.AppRef){
      this.setState({currentUser: {name: content.username}})
      const messageList = this.state.messages.concat(content);
      this.setState({messages: messageList });
    }
  }

  onIncomingNotification(content){
    if (this.refs.AppRef){
      const messageList = this.state.messages.concat(content);
      this.setState({
        messages: messageList,
        currentUser: {name: content.username}
      });
    }
  }

  onIncomingClientInfo(content){
    this.setState({numberOfClients: content.clientSize})
  }
  onNewMessage(content) {
    if(content.type === "postMessage"){
      if(content.username === "" || content.username === undefined || typeof content.username !== 'string'){
        content.username = "Anonymous"
      }
    } else if (content.type === "postNotification"){
      content.prevName = this.state.currentUser.name
      console.log("Current Prev Nmae:",content.prevName)
    }
    
    socket.send(JSON.stringify(content))
  }

  render() {
    return (
      <div ref="AppRef">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span>{this.state.numberOfClients} users Online</span>
        </nav>
        <MessageList Messages={this.state.messages} />
        <ChatBar CurrentUser={this.state.currentUser} onNewMessage={this.onNewMessage}/>
      </div>
    );
  }
}

export default App;
