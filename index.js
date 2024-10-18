const { Server } = require("socket.io");
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');


const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

  // this will emit the event to all connected sockets
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

  server.listen('49.43.116.96', () => {
    console.log('server running at http://49.43.116.96:3000');
  });