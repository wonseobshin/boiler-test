// server.js

const express = require('express');
const WebSocket = require('ws');
const uuid = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '127.0.0.1', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Set up a callback that will run when a client connects to the server


wss.on('connection', (ws) => {
    console.log('Client connected');
    //find number of clients and client.send it
    let numClients = {
        type: "incomingClientInfo",
        clientSize: wss.clients.size
    };
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(numClients))
    })

    ws.on('message', (data) => {
        // console.log("something here")
        if (data !== "A new connection appears...") {
            const key = uuid()
            data = JSON.parse(data)
            data.key = key

            if (data.type === "postMessage") {
                data.type = "incomingMessage"
                const newMessage = JSON.stringify(data)
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        // console.log("broadcasting");
                        // console.log(newMessage);
                        client.send(newMessage);
                    }
                });
            } else if (data.type === "postNotification") {
                data.type = "incomingNotification"
                const newNotification = JSON.stringify(data)
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(newNotification);
                    }
                })
            }
        } else console.log(data)
    });
    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        console.log('Client disconnected')
        numClients = {
            type: "incomingClientInfo",
            clientSize: wss.clients.size
        };
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(numClients))
        })
    });
    //do the same and send the number of clients
});