import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const socket = new WebSocket("ws://localhost:3001");





class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: {name: ""},
      messages : [
        { 
          key:1,
          type: "incomingMessage",
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous"
        },
        {
            key:2,
          type: "incomingNotification",
          content: "Anonymous changed their name to nomnom",
        },
        {
            key:3,
          type: "incomingMessage",
          content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous"
        },
        {
            key:4,
          type: "incomingMessage",
          content: "...",
          username: "nomnom"
        }]
    };

    this.onNewMessage = this.onNewMessage.bind(this)
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    
    $(()=>{
      socket.onopen = () => {
        console.log("Made a new connection");
        socket.send("A new connection appears...");
      };
      
      socket.onmessage = (content) => {
        // const contentHTML = 
        // console.log(content)
      
        content = JSON.parse(content.data)
        if(content.username === "" || content.username === undefined || typeof content.username !== 'string'){
          content.username = "Anonymous"
        }
        content.type = "incomingMessage"
      
        // console.log(JSON.stringify(content))
        const messageList = this.state.messages.concat(content);
        this.setState({messages: messageList });
      };
      
      socket.onclose = () => {
        alert("Socket is closed.");
      };
    })
  }

  onReceive(message) {
    const messageList = this.state.messages.concat(message);
    this.setState({messages: messageList });
  }

  onNewMessage(message) {
    const messageList = this.state.messages.concat(message);
    this.setState({messages: messageList });
    socket.send(JSON.stringify(message))
  }

  render() {
    // console.log("RENDERING: ", this.state.messages)
    return (
      <div>
        <MessageList Messages={this.state.messages} />
        <ChatBar CurrentUser={this.state.currentUser} CurrentKey={this.state.messages[this.state.messages.length-1].key} onNewMessage={this.onNewMessage}/>
      </div>
    );
  }
}

// $(() => {
  

//   // $("#chatBox").on('keyup', function(evt) {
//   //   if (evt.keyCode === 13) {
//   //     //If user has pressed enter
//   //     const message = $(this).val();
//   //     socket.send(message);
//   //     $(this).val('');
//   //   }
//   // });
// });

export default App;
