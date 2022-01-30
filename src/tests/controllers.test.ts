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

describe('Controller fns work as expected', () => {
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
    clientSocket.close();
  });

  beforeEach(() => {});

  afterEach(async () => {
    clientData.clear();
    state.clear();
    clientSocket.removeAllListeners();
    serverSocket.removeAllListeners();
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

  test('on failed join game, recieve "room is empty" notification', (done) => {
    clientSocket.emit('joinGame', () => {});
    serverSocket.on('joinGame', () => {
      handleJoinGame(serverSocket, io, 'roomID456');
    });
    clientSocket.on('notification', (notification) => {
      expect(notification.msg).toBe('This room is empty');
      done();
    });
  });

  test('on failed join game, recieve roomID back at client', (done) => {
    clientSocket.emit('joinGame', () => {});
    serverSocket.on('joinGame', () => {
      handleJoinGame(serverSocket, io, 'roomID123');
    });
    clientSocket.on('roomID', (roomID) => {
      expect(roomID).toBe('roomID123');
      done();
    });
  });

  test('on successful join game, clientData grows', (done) => {
    let roomID;
    clientSocket.emit('newGame');
    serverSocket.on('newGame', () => {
      handleNewGame(serverSocket);
    });
    clientSocket.on('roomID', (ID) => {
      console.log(ID);
      roomID = ID;
    });

    clientSocket.emit('joinGame', roomID);
    serverSocket.on('joinGame', () => {
      //console.log(roomID);
      handleJoinGame(serverSocket, io, roomID);
    });
    clientSocket.on('notification', (notification) => {
      expect(Object.keys(clientData).length).toBe(2);
      expect(Object.keys(state).length).toBe(1);
      done();
    });
  });
});
