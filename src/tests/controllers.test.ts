import {
  handleNewGame,
  handleJoinGame,
  handleLeaveGame,
  handleRollDice,
  handleTokenHover,
  handleTokenClick,
  handleReset,
  state,
} from '../controllers';

import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import Client from 'socket.io-client';

let io, serverSocket: Socket, clientSocket: Socket;
beforeAll((done) => {
  const httpServer = createServer();
  io = new Server(httpServer);
  httpServer.listen(() => {
    const port = httpServer.address().port;
    clientSocket = new Client(`http://localhost:${port}`);
    io.on('connection', (client: Socket) => {
      // serverSocket meaning the server-side partner of the client socket
      serverSocket = client;
      serverSocket.on('newGame', (cb) => {
        console.log('wow good job');
        //handleNewGame(client);
        cb();
      });
    });
    clientSocket.on('connect', done);
  });
});

afterAll(() => {
  io.close();
  clientSocket.close();
});

let clientData;
beforeEach(() => {
  clientData = {};
});

afterEach(() => {
  clientData = null;
});

test('should work', (done) => {
  clientSocket.on('hello', (arg) => {
    expect(arg).toBe('world');
    done();
  });
  serverSocket.emit('hello', 'world');
});

test('something', (done) => {
  clientSocket.emit('newGame', () => {
    expect(Object.values(state).length).toBe(1);
    done();
  });
  serverSocket.on('newGame', (cb) => {
    handleNewGame(serverSocket);
    cb();
  });
});
