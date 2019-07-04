import React, { Component } from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            // key : this.props.CurrentKey + 1,
            // type : "incomingMessage",
            username : "Anonymous",//this.props.CurrentUser.name,
            content : ""
        }

        // this.onCompose = this.onCompose.bind(this);
        this.onContent = this.onContent.bind(this);
        this.onPost = this.onPost.bind(this);
        this.onUsername = this.onUsername.bind(this);
    }

    // onCompose() {
    //     this.setState({ content: "" });
    // }

    onUsername(e) {
        
            this.setState({username : e.target.value})
        
    }
    onContent(e) {
        this.setState({
            content: e.target.value
        })
    }

    onPost(e) {
        
        this.props.onNewMessage(this.state);
        this.setState({content : ""})

    }

    render(e) {
      return (
        <footer className="chatbar">
            <input onChange={this.onUsername} className="chatbar-username" placeholder="Your Name (Optional)" name="username"/>
            <input onChange={this.onContent} value={this.state.content} className="chatbar-message" placeholder="Type a message and hit ENTER" />
            <button onClick={ ()=>{this.onPost("username")} } target="username">POST</button>
        </footer>
      );
    }
}
export default ChatBar;