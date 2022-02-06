"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = require("../controllers");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var socket_io_client_1 = __importDefault(require("socket.io-client"));
describe('Controller fns work as expected', function () {
    var io, serverSockets = [], clientSockets = [];
    beforeAll(function (done) {
        var httpServer = (0, http_1.createServer)();
        var generateClient = function (id) {
            var port = httpServer.address().port;
            var client = new socket_io_client_1.default("http://localhost:" + port);
            client.id = id;
            return client;
        };
        io = new socket_io_1.Server(httpServer);
        httpServer.listen(function () {
            clientSockets.push(generateClient());
            clientSockets.push(generateClient());
            io.on('connection', function (client) {
                // serverSocket meaning the server-side partner of the client socket
                serverSockets.push(client);
            });
            clientSockets.forEach(function (socket) { return socket.on('connect', done); });
        });
    });
    afterAll(function () {
        io.close();
        clientSocket.close();
    });
    beforeEach(function () { });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            controllers_1.clientData.clear();
            controllers_1.state.clear();
            clientSockets.forEach(function (socket) { return socket.removeAllListeners(); });
            serverSockets.forEach(function (socket) { return socket.removeAllListeners(); });
            return [2 /*return*/];
        });
    }); });
    test('sockets are able to send and receive messages', function (done) {
        clientSockets[0].on('hello', function (arg) {
            expect(arg).toBe('world');
            done();
        });
        serverSockets[0].emit('hello', 'world');
    });
    test('newGame msg creates new room in state', function (done) {
        clientSockets[0].emit('newGame', function () {
            expect(Object.values(controllers_1.state).length).toBe(1);
            expect(Object.values(controllers_1.clientData).length).toBe(1);
            done();
        });
        serverSockets[0].on('newGame', function (cb) {
            (0, controllers_1.handleNewGame)(serverSockets[0]);
            cb();
        });
    });
    test('newGame msg gets response of roomID', function (done) {
        clientSockets[0].emit('newGame', function () { });
        serverSockets[0].on('newGame', function () {
            (0, controllers_1.handleNewGame)(serverSockets[0]);
        });
        clientSockets[0].on('roomID', function (roomID) {
            expect(typeof roomID).toBe('string');
            expect(roomID.length).toBe(5);
            done();
        });
    });
    test('state and clientData initialize empty for tests', function () {
        expect(Object.values(controllers_1.state).length).toBe(0);
        expect(Object.values(controllers_1.clientData).length).toBe(0);
    });
    test('on failed join game, recieve "room is empty" notification', function (done) {
        clientSockets[0].emit('joinGame', function () { });
        serverSockets[0].on('joinGame', function () {
            (0, controllers_1.handleJoinGame)(serverSockets[0], io, 'roomID456');
        });
        clientSockets[0].on('notification', function (notification) {
            expect(notification.msg).toBe('This room is empty');
            done();
        });
    });
    test('on failed join game, recieve roomID back at client', function (done) {
        clientSockets[0].emit('joinGame', function () { });
        serverSockets[0].on('joinGame', function () {
            (0, controllers_1.handleJoinGame)(serverSockets[0], io, 'roomID123');
        });
        clientSockets[0].on('roomID', function (roomID) {
            expect(roomID).toBe('roomID123');
            done();
        });
    });
    test('client leaving room of 1 deletes game from state and client from clientData', function (done) {
        clientSockets[0].emit('newGame');
        serverSockets[0].on('newGame', function () { return (0, controllers_1.handleNewGame)(serverSockets[0]); });
        clientSockets[0].emit('leaveGame');
        serverSockets[0].on('leaveGame', function () {
            (0, controllers_1.handleLeaveGame)(serverSockets[0], io);
            expect(Object.keys(controllers_1.state).length).toBe(0);
            expect(Object.keys(controllers_1.clientData).length).toBe(0);
            done();
        });
    });
    test('handleRollDice sets Game rollVal property', function () {
        clientSockets[0].emit('newGame');
        serverSockets[0].on('newGame', function () { return (0, controllers_1.handleNewGame)(serverSockets[0]); });
        serverSockets[0].on('rollDice', function () {
            (0, controllers_1.handleRollDice)(serverSockets[0], io);
            done();
        });
        clientSockets[0].emit('rollDice');
    });
    test('two players can join game together', function (done) {
        serverSockets[0].on('newGame', function () { return (0, controllers_1.handleNewGame)(serverSockets[0]); });
        //serverSockets[1].on('joinGame', (roomID) =>
        //handleJoinGame(serverSockets[1], io, roomID)
        //);
        clientSockets[0].on('roomID', function (roomID) {
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
