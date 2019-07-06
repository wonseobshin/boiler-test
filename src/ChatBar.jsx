import React, { Component } from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            // key : this.props.CurrentKey + 1,
            type : "",
            username : "Anonymous",//this.props.CurrentUser.name,
            content : ""
        }

        // this.onCompose = this.onCompose.bind(this);
        this.onContent = this.onContent.bind(this);
        this.onPost = this.onPost.bind(this);
        this.onUsername = this.onUsername.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    // onCompose() {
    //     this.setState({ content: "" });
    // }

    onUsername(e) {
        this.setState({
            username : e.target.value,
            type: "postNotification"
        })
    }
    onContent(e) {
        this.setState({
            content: e.target.value,
            type: "postMessage"
        })
    }

    onKeyUp(e){
        if (e.keyCode === 13) {
            this.onPost(e);
            e.target.value = ''            
        }
    }

    onPost(e) {
        if(this.state.type === "postMessage"){
            if(this.state.content !== ''){
                this.props.onNewMessage(this.state);
                this.setState({content: ''})
            }
            return;
        } else {
            this.setState({
                prevName : this.state.username
            })
            this.setState({username:e.target.value})
            this.props.onNewMessage(this.state);
        }
        // this.setState({content : ""}) 
    }

    render(e) {
      return (
        <footer className="chatbar">
            <input onChange={this.onUsername} onKeyUp={this.onKeyUp} className="chatbar-username" placeholder="Your Name (Optional)" name="username"/>
            <input onChange={this.onContent} onKeyUp={this.onKeyUp} value={this.state.content} className="chatbar-message" placeholder="Type a message and hit ENTER" />
            {/* <button onClick={ ()=>{this.onPost()} } target="username">POST</button> */}
        </footer>
      );
    }
}
export default ChatBar;