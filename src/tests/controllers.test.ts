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
  let io,
    serverSockets: Array<Socket> = [],
    clientSockets: Array<Socket> = [];

  beforeAll((done) => {
    const httpServer = createServer();

    const generateClient = (id) => {
      const port = httpServer.address().port;
      const client = new Client(`http://localhost:${port}`);
      client.id = id;
      return client;
    };

    io = new Server(httpServer);
    httpServer.listen(() => {
      clientSockets.push(generateClient());
      clientSockets.push(generateClient());
      io.on('connection', (client: Socket) => {
        // serverSocket meaning the server-side partner of the client socket
        serverSockets.push(client);
      });
      clientSockets.forEach((socket) => socket.on('connect', done));
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
    clientSockets.forEach((socket) => socket.removeAllListeners());
    serverSockets.forEach((socket) => socket.removeAllListeners());
  });

  test('sockets are able to send and receive messages', (done) => {
    clientSockets[0].on('hello', (arg) => {
      expect(arg).toBe('world');
      done();
    });
    serverSockets[0].emit('hello', 'world');
  });

  test('newGame msg creates new room in state', (done) => {
    clientSockets[0].emit('newGame', () => {
      expect(Object.values(state).length).toBe(1);
      expect(Object.values(clientData).length).toBe(1);
      done();
    });
    serverSockets[0].on('newGame', (cb) => {
      handleNewGame(serverSockets[0]);
      cb();
    });
  });

  test('newGame msg gets response of roomID', (done) => {
    clientSockets[0].emit('newGame', () => {});
    serverSockets[0].on('newGame', () => {
      handleNewGame(serverSockets[0]);
    });
    clientSockets[0].on('roomID', (roomID) => {
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
    clientSockets[0].emit('joinGame', () => {});
    serverSockets[0].on('joinGame', () => {
      handleJoinGame(serverSockets[0], io, 'roomID456');
    });
    clientSockets[0].on('notification', (notification) => {
      expect(notification.msg).toBe('This room is empty');
      done();
    });
  });

  test('on failed join game, recieve roomID back at client', (done) => {
    clientSockets[0].emit('joinGame', () => {});
    serverSockets[0].on('joinGame', () => {
      handleJoinGame(serverSockets[0], io, 'roomID123');
    });
    clientSockets[0].on('roomID', (roomID) => {
      expect(roomID).toBe('roomID123');
      done();
    });
  });

  test('client leaving room of 1 deletes game from state and client from clientData', (done) => {
    clientSockets[0].emit('newGame');
    serverSockets[0].on('newGame', () => handleNewGame(serverSockets[0]));
    clientSockets[0].emit('leaveGame');
    serverSockets[0].on('leaveGame', () => {
      handleLeaveGame(serverSockets[0], io);
      expect(Object.keys(state).length).toBe(0);
      expect(Object.keys(clientData).length).toBe(0);
      done();
    });
  });
  test('handleRollDice sets Game rollVal property', () => {
    clientSockets[0].emit('newGame');
    serverSockets[0].on('newGame', () => handleNewGame(serverSockets[0]));
    serverSockets[0].on('rollDice', () => {
      handleRollDice(serverSockets[0], io);
      done();
    });
    clientSockets[0].emit('rollDice');
  });
  test('two players can join game together', (done) => {
    serverSockets[0].on('newGame', () => handleNewGame(serverSockets[0]));
    //serverSockets[1].on('joinGame', (roomID) =>
    //handleJoinGame(serverSockets[1], io, roomID)
    //);
    clientSockets[0].on('roomID', (roomID) => {
      // why does it fire twice?
      console.log(roomID);
      //clientSockets[1].emit('joinGame', roomID);
      //expect(Object.keys(clientData).length).toBe(2);
      done();
    });
    clientSockets[0].emit('newGame');
  });
  test.todo('add handleTokenHover test');
});
