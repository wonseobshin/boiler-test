import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    
    render() {
      console.log("rendering at ML: ", this.props.Messages)
      return (
        <main className="messages">
            <Message MessageData={this.props.Messages} />
        </main>
      );
    }
}

export default MessageList;
  