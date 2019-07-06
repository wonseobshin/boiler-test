import React, { Component } from 'react';

class Message extends Component {
    
    loadMessage (){ 
        return this.props.MessageData.map((data) => {
            if(data.type === "incomingMessage"){
                return (
                    <div key={data.key} className="message">
                        <span className="message-username">{data.username}</span>
                        <span className="message-content">{data.content}</span>
                    </div>)
            } else if(data.type === "incomingNotification"){
                return (
                    <div key={data.key} className="message system">
                        <span>{data.prevName} changed their name to {data.username}. </span>
                    </div>
                )
            }

            return;
        })
    }

    render() {
        return (
            <div>
                {this.loadMessage()}
            </div>
        )
    }
}

export default Message;