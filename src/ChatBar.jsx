import React, { Component } from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            key : this.props.CurrentKey + 1,
            type : "incomingMessage",
            username : this.props.CurrentUser.name,
            content : ""
        }

        this.onCompose = this.onCompose.bind(this);
        this.onContent = this.onContent.bind(this);
        this.onPost = this.onPost.bind(this);
    }

    onCompose() {
        this.setState({ content: "" });
    }

    onContent(e) {
        this.setState({
            content: e.target.value
        })

        if(this.state.username === "" || this.state.username === undefined){
            this.setState({ username: "Anonymous" })
        }
    }

    onPost() {
        this.props.onNewMessage(this.state);
        this.setState({content : ""})
    }

    render(e) {
      return (
        <footer className="chatbar">
            <input className="chatbar-username" placeholder="Your Name (Optional)" />
            <input onChange={this.onContent} className="chatbar-message" placeholder="Type a message and hit ENTER" />
            <button onClick={ this.onPost }>POST</button>
        </footer>
      );
    }
}
export default ChatBar;