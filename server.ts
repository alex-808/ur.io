const http = require('http');
const path = require('path');
import express from 'express';
import { Server, Socket } from 'socket.io';

import {
  handleNewGame,
  handleJoinGame,
  handleRollDice,
  handleTokenClick,
  handleTokenHover,
  handleReset,
  handleLeaveGame,
} from './controllers';

const port = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (client: Socket) => {
  console.log('connection!');
  console.log('clients connected:', io.engine.clientsCount);

  client.on('newGame', () => handleNewGame(client));
  client.on('joinGame', (roomID: string) => handleJoinGame(client, io, roomID));
  client.on('rollDice', () => handleRollDice(client, io));
  client.on('tokenClick', (playerID, token) =>
    handleTokenClick(client, io, playerID, token)
  );
  client.on('tokenHover', (playerID, token) =>
    handleTokenHover(client, playerID, token)
  );
  client.on('reset', () => handleReset(client, io));
  client.on('disconnect', () => handleLeaveGame(client, io));
  client.on('leaveGame', () => handleLeaveGame(client, io));
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
