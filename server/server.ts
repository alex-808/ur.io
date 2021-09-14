const express = require('express');
const http = require('http');
import { Server, Socket } from 'socket.io';
import { makeID } from './utils';
import { Game, GameI } from './game';

const port = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const state: { [roomID: string]: GameI } = {};
// Map of clientID to their roomID
const clientRooms = {};

io.on('connection', (client: Socket) => {
  console.log('connection!');
  console.log(io.engine.clientsCount);
  client.on('newGame', (data: any) => handleNewGame());

  const handleNewGame = () => {
    // create room and pass back the uuid
    const roomID = makeID(5);
    console.log(roomID);
    client.emit('roomID', roomID);
    state[`${roomID}`] = new Game();
  };
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
