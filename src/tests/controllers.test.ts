import {
  handleNewGame,
  handleJoinGame,
  handleLeaveGame,
  handleRollDice,
  handleTokenHover,
  handleTokenClick,
  handleReset,
  state,
  clientData,
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
    });
    clientSocket.on('connect', done);
  });
});

afterAll(() => {
  io.close();
  clientSocket.removeAllListeners();
  clientSocket.close();
});

beforeEach(() => {});

afterEach(async () => {
  clientData.clear();
  state.clear();
});

test('sockets are able to send and receive messages', (done) => {
  clientSocket.on('hello', (arg) => {
    expect(arg).toBe('world');
    done();
  });
  serverSocket.emit('hello', 'world');
});

test('newGame msg creates new room in state', (done) => {
  clientSocket.emit('newGame', () => {
    expect(Object.values(state).length).toBe(1);
    expect(Object.values(clientData).length).toBe(1);
    done();
  });
  serverSocket.on('newGame', (cb) => {
    handleNewGame(serverSocket);
    cb();
  });
});

test('newGame msg gets response of roomID', (done) => {
  clientSocket.emit('newGame', () => {});
  serverSocket.on('newGame', () => {
    handleNewGame(serverSocket);
  });
  clientSocket.on('roomID', (roomID) => {
    expect(typeof roomID).toBe('string');
    expect(roomID.length).toBe(5);
    done();
  });
});
test('state and clientData initialize empty for tests', () => {
  expect(Object.values(state).length).toBe(0);
  expect(Object.values(clientData).length).toBe(0);
});
