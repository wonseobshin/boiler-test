import React, { Component } from 'react';

class Message extends Component {
    
    // constructor(props){
    //     super(props)

    //     const messageData = props.MessageData
    //     let prevName = messageData[messageData.length-2].username;
    //     let newName = messageData[messageData.length-1].username;
    //     console.log("names: ",prevName, newName);

    // }
    // constructor(props){
    //     super(props);

        
    // }
    loadMessage (){ 
        return this.props.MessageData.map((data) => {
            // console.log("Rendering at messages: ", data)
            console.log("BREAKPOINT DATA ",data)

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