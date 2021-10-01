"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
var path = require('path');
var express_1 = __importDefault(require("express"));
var socket_io_1 = require("socket.io");
var controllers_1 = require("./controllers");
var port = process.env.PORT || 5000;
var app = (0, express_1.default)();
app.use(express_1.default.static(path.join(__dirname, '../client/build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
var server = http.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', function (client) {
    console.log('connection!');
    console.log('clients connected:', io.engine.clientsCount);
    client.on('newGame', function () { return (0, controllers_1.handleNewGame)(client); });
    client.on('joinGame', function (roomID) { return (0, controllers_1.handleJoinGame)(client, io, roomID); });
    client.on('rollDice', function () { return (0, controllers_1.handleRollDice)(client, io); });
    client.on('tokenClick', function (playerID, token) {
        return (0, controllers_1.handleTokenClick)(client, io, playerID, token);
    });
    client.on('tokenHover', function (playerID, token) {
        return (0, controllers_1.handleTokenHover)(client, playerID, token);
    });
    client.on('reset', function () { return (0, controllers_1.handleReset)(client, io); });
    client.on('disconnect', function () { return (0, controllers_1.handleLeaveGame)(client, io); });
    client.on('leaveGame', function () { return (0, controllers_1.handleLeaveGame)(client, io); });
});
server.listen(port, function () {
    console.log("Listening on port " + port);
});
