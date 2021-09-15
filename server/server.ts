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
const clientRooms: { [clientID: string]: string } = {};

io.on('connection', (client: Socket) => {
  console.log('connection!');
  console.log(io.engine.clientsCount);
  client.on('newGame', () => handleNewGame());
  client.on('joinGame', (roomID: string) => handleJoinGame(roomID));

  const handleNewGame = () => {
    // create room and pass back the uuid
    const roomID = makeID(5);
    console.log(roomID);
    client.emit('roomID', roomID);
    clientRooms[`${client.id}`] = roomID;
    state[`${roomID}`] = new Game();

    client.join(roomID);
  };

  const handleJoinGame = (roomID: string) => {
    console.log('Someone wants to join room', roomID);
    const room = io.sockets.adapter.rooms.get(roomID);
    console.log(room?.size);
    if (!room) {
      client.emit('noRoom');
      return;
    }
    if (room.size >= 2) {
      client.emit('roomFull');
      return;
    }

    client.join(roomID);
    clientRooms[`${client.id}`] = roomID;
    console.log(room.size);
  };
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
