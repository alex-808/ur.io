"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLeaveGame = exports.handleReset = exports.handleTokenHover = exports.handleTokenClick = exports.handleRollDice = exports.handleJoinGame = exports.handleNewGame = void 0;
var game_1 = require("./game");
var utils_1 = require("./utils");
var constants = __importStar(require("./constants"));
var state = {};
// Map of clientID to their roomID
var clientData = {};
var handleNewGame = function (client) {
    // create room and pass back the uuid
    var roomID = (0, utils_1.makeID)(5);
    client.emit('roomID', roomID);
    clientData["" + client.id] = { room: roomID, playerID: 0 };
    state["" + roomID] = new game_1.Game();
    state[roomID].addPlayer();
    client.join(roomID);
};
exports.handleNewGame = handleNewGame;
var handleJoinGame = function (client, server, roomID) {
    console.log('Someone wants to join room', roomID);
    var room = server.sockets.adapter.rooms.get(roomID);
    if (!room) {
        // emit roomID so they are still sent to WaitingRoom
        client.emit('roomID', roomID);
        client.emit('notification', { msg: 'This room is empty' });
        return;
    }
    if (room.size >= 2) {
        client.emit('notification', { msg: 'Room is already full' });
        return;
    }
    client.join(roomID);
    clientData["" + client.id] = { room: roomID, playerID: 1 };
    var game = state[roomID];
    game.addPlayer();
    client.emit('roomID', roomID);
    server.sockets.in(roomID).emit('init', state[roomID]);
    updateGamePhaseNotification(server, game, roomID);
};
exports.handleJoinGame = handleJoinGame;
var handleLeaveGame = function (client, server) {
    var _a;
    var roomID = (_a = clientData[client.id]) === null || _a === void 0 ? void 0 : _a.room;
    var room = server.sockets.adapter.rooms.get(roomID);
    client.leave(roomID);
    if (!(room === null || room === void 0 ? void 0 : room.size)) {
        delete state[roomID];
        console.log('Game state deleted');
        console.table(state);
    }
    delete clientData[client.id];
    console.log('clientData deleted');
    console.table(clientData);
    client.emit('roomID', null);
    client.emit('notification', { msg: '' });
    client.emit('updateState', null);
    server.sockets.in(roomID).emit('notification', { msg: 'Partner Left Room' });
};
exports.handleLeaveGame = handleLeaveGame;
var handleRollDice = function (client, server) {
    var _a;
    var roomID = clientData[client.id].room;
    var playerNum = clientData[client.id].playerID;
    var game = state[roomID];
    var activePlayerID = (_a = game.activePlayer) === null || _a === void 0 ? void 0 : _a.id;
    if (playerNum !== activePlayerID)
        return;
    game.rollDice();
    if (game.AreNoMoves() || game.rollVal === 0) {
        game.changeTurn();
        server.sockets.in(roomID).emit('updateState', game);
        server.sockets.in(roomID).emit('notification', {
            msg: game.rollVal + " Rolled, Player " + (game.activePlayer.id + 1) + "'s Roll",
        });
    }
    else {
        game.phase = 'movement';
        updateGamePhaseNotification(server, game, roomID);
        server.sockets.in(roomID).emit('updateState', game);
    }
};
exports.handleRollDice = handleRollDice;
var handleTokenHover = function (client, tokenOwnerID, token) {
    var roomID = clientData[client.id].room;
    var game = state[roomID];
    if (!game.isMovePossible(tokenOwnerID, token)) {
        client.emit('tileHighlight', null);
        return;
    }
    var tileID;
    if (token == constants.PLAYER_START) {
        tileID = game.activePlayer.path.get(game.rollVal - 1);
    }
    else {
        var tokenPos = game.activePlayer.tokens[token];
        tileID = game.activePlayer.path.get(game.rollVal + tokenPos);
    }
    client.emit('tileHighlight', tileID);
};
exports.handleTokenHover = handleTokenHover;
var handleTokenClick = function (client, server, tokenOwnerID, token) {
    var roomID = clientData[client.id].room;
    var playerID = clientData[client.id].playerID;
    var game = state[roomID];
    if (!game.isMovePossible(tokenOwnerID, token) || tokenOwnerID !== playerID)
        return;
    if (token === constants.PLAYER_START) {
        token = game.activePlayer.tokens.findIndex(function (tokenPos) { return tokenPos === constants.PLAYER_START; });
    }
    var newPos = game.activePlayer.moveToken(token, game.rollVal);
    game.checkForCaptures();
    if (newPos === null)
        return;
    game.handleNewTokenPosition(newPos);
    game.updateBoard();
    server.sockets.in(roomID).emit('updateState', game);
    updateGamePhaseNotification(server, game, roomID);
};
exports.handleTokenClick = handleTokenClick;
var handleReset = function (client, server) {
    var roomID = clientData[client.id].room;
    var game = state[roomID];
    game.reset();
    game.updateBoard();
    server.sockets.in(roomID).emit('updateState', game);
    updateGamePhaseNotification(server, game, roomID);
};
exports.handleReset = handleReset;
var updateGamePhaseNotification = function (server, game, roomID) {
    if (!game.activePlayer)
        return;
    var activePlayerNum = game.activePlayer.id + 1;
    if (game.phase === 'movement') {
        server.sockets.in(roomID).emit('notification', {
            msg: "Player " + activePlayerNum + "'s Move",
        });
    }
    else if (game.phase === 'rolling') {
        server.sockets.in(roomID).emit('notification', {
            msg: "Player " + activePlayerNum + "'s Roll",
        });
    }
    else if (game.phase === 'gameOver') {
        server.sockets.in(roomID).emit('notification', {
            msg: "Player " + activePlayerNum + " Wins!",
        });
    }
};
