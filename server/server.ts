const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (client: any) => {
  console.log('connection!');
  io.on('Hello', () => {
    console.log('Hello recieved!');
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
