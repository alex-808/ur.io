const express = require('express');
const http = require('http');
import { Server, Socket } from 'socket.io';
import { makeID } from './utils';
import { Game, GameI } from './game';
import * as constants from './constants';

const port = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

interface ClientData {
  room: string;
  playerID: number;
}

const state: { [roomID: string]: GameI } = {};
// Map of clientID to their roomID
const clientData: { [clientID: string]: ClientData } = {};

io.on('connection', (client: Socket) => {
  console.log('connection!');
  console.log('clients connected:', io.engine.clientsCount);

  client.on('newGame', () => handleNewGame());
  client.on('joinGame', (roomID: string) => handleJoinGame(roomID));
  client.on('rollDice', () => handleRollDice());
  client.on('tokenClick', (playerID, token) =>
    handleTokenClick(playerID, token)
  );
  client.on('reset', () => handleReset());
  client.on('disconnect', () => handleLeaveGame());
  client.on('leaveGame', () => handleLeaveGame());

  const handleNewGame = () => {
    // create room and pass back the uuid
    const roomID = makeID(5);
    console.log(roomID);
    client.emit('roomID', roomID);
    clientData[`${client.id}`] = { room: roomID, playerID: 0 };
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
    clientData[`${client.id}`] = { room: roomID, playerID: 1 };
    console.log(room.size);
    const game = state[roomID];
    game.addPlayer();

    io.sockets.in(roomID).emit('init', state[roomID]);
    updateGamePhaseNotification(game, roomID);
  };

  const handleLeaveGame = () => {
    const roomID = clientData[client.id]?.room;
    const room = io.sockets.adapter.rooms.get(roomID);
    client.leave(roomID);

    if (!room?.size) {
      delete state[roomID];
      console.log('Game state deleted');
      console.table(state);
    }

    delete clientData[client.id];
    console.log('clientData deleted');
    console.table(clientData);
    client.emit('updateState', undefined);
    io.sockets.in(roomID).emit('notification', { msg: 'Partner Left Room' });
  };

  const handleRollDice = () => {
    const roomID = clientData[client.id].room;
    const playerNum = clientData[client.id].playerID;
    const game = state[roomID];
    let activePlayerID = game.activePlayer?.id;

    if (playerNum !== activePlayerID) return;

    game.rollDice();
    if (game.AreNoMoves()) {
      game.changeTurn();
      let activePlayerNum = game.activePlayer?.id;
      io.sockets.in(roomID).emit('updateState', game);
      io.sockets.in(roomID).emit('notification', {
        msg: `${game.rollVal} Rolled, Player ${activePlayerNum! + 1}'s Roll`,
      });
    } else if (game.rollVal === 0) {
      game.changeTurn();
      let activePlayerNum = game.activePlayer?.id;
      io.sockets.in(roomID).emit('updateState', game);
      io.sockets.in(roomID).emit('notification', {
        msg: `0 Rolled, Player ${activePlayerNum! + 1}'s Roll`,
      });
    } else {
      game.phase = 'movement';
      updateGamePhaseNotification(game, roomID);
      io.sockets.in(roomID).emit('updateState', game);
    }
  };
  const handleTokenClick = (tokenOwnerID: any, token: number) => {
    const roomID = clientData[client.id].room;
    const playerNum = clientData[client.id].playerID;
    const game = state[roomID];
    // I'd like to clean this up a bit
    if (
      tokenOwnerID !== game.activePlayer?.id ||
      playerNum !== game.activePlayer?.id ||
      !game.rollVal ||
      token === null ||
      game.phase !== 'movement' ||
      !game.activePlayer
    ) {
      console.log('Invalid move');
      return;
    }
    if (token === constants.PLAYER_START) {
      token = game.activePlayer?.tokens.findIndex(
        (tokenPos) => tokenPos === constants.PLAYER_START
      );
    }
    const newPos = game.activePlayer.moveToken(token, game.rollVal);
    game.checkForCaptures();
    if (newPos === null) return;
    if (newPos === constants.GOAL_TILE) {
      game.activePlayer.scoreGoal();
      if (game.activePlayer.tokens.length === 0) {
        game.phase = 'gameOver';
        console.log('gameOver');
        game.updateBoard();
        io.sockets.in(roomID).emit('updateState', game);
        updateGamePhaseNotification(game, roomID);
        return;
      }
    }
    if (!constants.ROSETTE_TILES.includes(newPos)) {
      game.changeTurn();
    } else {
      game.phase = 'rolling';
    }
    game.updateBoard();
    console.log('Board updated');

    io.sockets.in(roomID).emit('updateState', game);
    updateGamePhaseNotification(game, roomID);
  };

  const handleReset = () => {
    const roomID = clientData[client.id].room;
    const game = state[roomID];
    console.log('new game');
    game.reset();
    game.updateBoard();
    io.sockets.in(roomID).emit('updateState', game);
    updateGamePhaseNotification(game, roomID);
  };
});

const updateGamePhaseNotification = (game: GameI, roomID: string) => {
  if (!game?.activePlayer) return;
  console.log(game.phase);
  const activePlayerNum = game.activePlayer.id! + 1;
  if (game.phase === 'movement') {
    io.sockets.in(roomID).emit('notification', {
      msg: `Player ${activePlayerNum}'s Move`,
    });
  } else if (game.phase === 'rolling') {
    io.sockets.in(roomID).emit('notification', {
      msg: `Player ${activePlayerNum}'s Roll`,
    });
  } else if (game.phase === 'gameOver') {
    io.sockets.in(roomID).emit('notification', {
      msg: `Player ${activePlayerNum} Wins!`,
    });
  }
};

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
