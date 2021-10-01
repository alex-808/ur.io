"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLeaveGame = exports.handleResetGame = exports.handleRollDice = exports.handleTokenHover = exports.handleTokenClick = exports.handleJoinGame = exports.handleCreateNewGame = exports.socket = void 0;
var socket_1 = require("./socket");
Object.defineProperty(exports, "socket", { enumerable: true, get: function () { return socket_1.socket; } });
var handleCreateNewGame = function () {
    socket_1.socket.emit('newGame');
};
exports.handleCreateNewGame = handleCreateNewGame;
var handleJoinGame = function (roomID) {
    socket_1.socket.emit('joinGame', roomID);
};
exports.handleJoinGame = handleJoinGame;
var handleTokenClick = function (playerID, token) {
    socket_1.socket.emit('tokenClick', playerID, token);
};
exports.handleTokenClick = handleTokenClick;
var handleTokenHover = function (playerID, token) {
    socket_1.socket.emit('tokenHover', playerID, token);
};
exports.handleTokenHover = handleTokenHover;
var handleRollDice = function () {
    socket_1.socket.emit('rollDice');
};
exports.handleRollDice = handleRollDice;
var handleResetGame = function () {
    socket_1.socket.emit('reset');
};
exports.handleResetGame = handleResetGame;
var handleLeaveGame = function () {
    socket_1.socket.emit('leaveGame');
};
exports.handleLeaveGame = handleLeaveGame;
