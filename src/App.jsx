import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

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
    // this.load();

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {key: 5, type:"incomingMessage", username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  onNewMessage(message) {
    const messageList = this.state.messages.concat(message);
    this.setState({messages: messageList });
    console.log(messageList)
  }

  render() {
    console.log("RENDERING: ", this.state.messages)
    return (
      <div>
        <MessageList Messages={this.state.messages} />
        <ChatBar CurrentUser={this.state.currentUser} CurrentKey={this.state.messages[this.state.messages.length-1].key} onNewMessage={this.onNewMessage}/>
      </div>
    );
  }
}

export default App;
