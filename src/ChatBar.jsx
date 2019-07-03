import React, { Component } from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            key : this.props.CurrentKey + 1,
            type : "incomingMessage",
            username : this.props.CurrentUser,
            content : ""
        }
    }

    onCompose(e) {
        this.setState(() => ({
            content: ""
        }));
    }

    onContent(e) {
        this.setState({content: e.target.value})
    }

    onPost() {
        this.props.onNewPost(this.state.content);
        this.state.content = ""
    }

    render(e) {
      return (
        <footer className="chatbar">
            <input className="chatbar-username" placeholder="Your Name (Optional)" />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      );
    }
  }
  export default ChatBar;