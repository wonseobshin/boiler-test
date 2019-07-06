import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    
    render() {
      return (
        <main className="messages">
            <Message MessageData={this.props.Messages} />
        </main>
      );
    }
}

export default MessageList;
  