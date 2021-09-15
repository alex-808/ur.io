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
  client.on('rollDice', () => handleRollDice());

  const handleNewGame = () => {
    // create room and pass back the uuid
    const roomID = makeID(5);
    console.log(roomID);
    client.emit('roomID', roomID);
    clientRooms[`${client.id}`] = roomID;
    state[`${roomID}`] = new Game();
    state[roomID].addPlayer();
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
    state[roomID].addPlayer();

    io.sockets.in(roomID).emit('init', state[roomID]);
  };

  const handleRollDice = () => {
    const room = clientRooms[client.id];
    const game = state[room];
    game.rollDice();
    io.sockets.in(room).emit('updateState', game);
  };

  //const handleTokenClick: handleTokenClick = (playerID, token) => {
  //if (
  //playerID !== game.current.activePlayer?.id ||
  //!game.current.rollVal ||
  //token === null ||
  //game.current.phase !== 'movement' ||
  //!game.current.activePlayer
  //) {
  //return;
  //}
  //if (token === constants.PLAYER_START) {
  //token = game.current.activePlayer?.tokens.findIndex(
  //(tokenPos) => tokenPos === constants.PLAYER_START
  //);
  //}
  //const newPos = game.current.activePlayer.moveToken(
  //token,
  //game.current.rollVal
  //);
  //game.current.checkForCaptures();
  //if (newPos === null) return;
  //if (newPos === constants.GOAL_TILE) {
  //game.current.activePlayer.scoreGoal();
  //if (game.current.activePlayer.tokens.length === 0) {
  //game.current.phase = 'gameOver';
  //console.log('gameOver');
  //game.current.updateBoard();
  //setGameState({ ...game.current });
  //return;
  //}
  //}
  //if (!constants.ROSETTE_TILES.includes(newPos)) {
  //game.current.changeTurn();
  //} else {
  //game.current.phase = 'rolling';
  //}
  //game.current.updateBoard();

  //setGameState({ ...game.current });
  ////};

  //const resetGame = () => {
  //console.log('new game');
  //game.current.reset();
  //game.current.updateBoard();
  //setGameState({ ...game.current });
  //};
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
