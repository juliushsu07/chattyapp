// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.



const broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

let counter = 0;
let oldUsername = "";

const subtractUserCounter = () => {
  counter--;
  let res = {
    type: "incomingUserCounter",
    userCounter: counter
  }
  broadcast(JSON.stringify(res));
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  // addUserCounter()

  ws.on('message', (data) => {
    const res = JSON.parse(data);
    res.id = uuidv1();

    switch(res.type) {
      case "initializeUser":
        res.type = "incomingUserCounter";
        counter = counter +1;
        res.userCounter= counter;
        oldUsername = res.oldUsername;
      break;
      case "postMessage":
        // handle incoming message
        res.type = "incomingMessage";
        break;
      case "postNotification":
        // handle incoming notification
        res.type ="incomingNotification";
        res.content = `${oldUsername} ${res.content} ${res.newUsername}`;
        oldUsername = res.newUsername;
        break;
      }
      broadcast(JSON.stringify(res));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    subtractUserCounter();
  });
});

