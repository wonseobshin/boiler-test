import React, { Component } from 'react';

class Message extends Component {

    message = this.props.MessageData.map((data) => {
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

    render() {
        return (
            <div>
                {this.message}
            </div>
        )
    }
}

export default Message;