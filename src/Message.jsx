import React, { Component } from 'react';

class Message extends Component {
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         message : 
    //     }
    // }

    loadMessage (){ 
        return this.props.MessageData.map((data) => {
            // console.log("Rendering at messages: ", data)
            if(data.type === "incomingMessage"){
                return (
                    <div key={data.key} className="message">
                        <span className="message-username">{data.username}</span>
                        <span className="message-content">{data.content}</span>
                    </div>)
            } else if(data.type === "incomingNotification"){
                return (
                    <div key={data.key}className="message system">
                        Anonymous1 changed their name to nomnom.
                    </div>
                )
            }

            return;
        })
    }

    // componentDidMount() {
    //     this.loadMessage()
    // }

    render() {
        return (
            <div>
                {this.loadMessage()}
            </div>
        )
    }
}

export default Message;