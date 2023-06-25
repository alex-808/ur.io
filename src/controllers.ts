import { Server, Socket } from 'socket.io';
import { Game } from './game';
import { makeID } from './utils';
import * as constants from './constants';

interface ClientData {
    room: string;
    playerID: number;
    clear: () => void;
}
const clearData = function () {
    // strips properties off data structures for testing purposes

    if (typeof this !== 'object') return;
    Object.keys(this).forEach((key) => {
        delete this[key];
    });
};

const ClientData = function () {};
ClientData.prototype.clear = clearData;

const State = function () {};
State.prototype.clear = clearData;

const state: { [roomID: string]: Game } = new State();
// Map of clientID to their roomID
const clientData: { [clientID: string]: ClientData } = new ClientData();

const handleNewGame = (client: Socket) => {
    // create room and pass back the uuid
    const roomID = makeID(5);

    client.emit('roomID', roomID);
    clientData[`${client.id}`] = { room: roomID, playerID: 0 };

    state[`${roomID}`] = new Game();
    state[roomID].addPlayer();
    client.join(roomID);
};

const handleJoinGame = (client: Socket, server: Server, roomID: string) => {
    const room = server.sockets.adapter.rooms.get(roomID);

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

    clientData[`${client.id}`] = { room: roomID, playerID: 1 };

    const game = state[roomID];
    game.addPlayer();

    client.emit('roomID', roomID);

    server.sockets.in(roomID).emit('init', state[roomID]);
    updateGamePhaseNotification(server, game, roomID);
};

const handleLeaveGame = (client: Socket, server: Server) => {
    const roomID = clientData[client.id]?.room;
    const room = server.sockets.adapter.rooms.get(roomID);

    client.leave(roomID);

    if (!room?.size) {
        delete state[roomID];
    }

    delete clientData[client.id];

    client.emit('roomID', null);
    client.emit('notification', { msg: '' });
    client.emit('updateState', null);

    server.sockets
        .in(roomID)
        .emit('notification', { msg: 'Partner Left Room' });
};

const handleRollDice = (client: Socket, server: Server) => {
    const roomID = clientData[client.id].room;
    const playerNum = clientData[client.id].playerID;
    const game = state[roomID];
    let activePlayerID = game.activePlayer?.id;

    if (playerNum !== activePlayerID) return;

    game.rollDice();

    if (game.AreNoMoves() || game.rollVal === 0) {
        game.changeTurn();

        server.sockets.in(roomID).emit('updateState', game);
        server.sockets.in(roomID).emit('notification', {
            msg: `${game.rollVal} Rolled, Player ${
                game.activePlayer!.id! + 1
            }'s Roll`,
        });
    } else {
        game.phase = 'movement';
        updateGamePhaseNotification(server, game, roomID);
        server.sockets.in(roomID).emit('updateState', game);
    }
};

const handleTokenHover = (
    client: Socket,
    tokenOwnerID: PlayerID,
    token: number
) => {
    const roomID = clientData[client.id].room;
    const game = state[roomID];
    if (!game.isMovePossible(tokenOwnerID, token)) {
        client.emit('tileHighlight', null);
        return;
    }

    let tileID: number | undefined;

    if (token == constants.PLAYER_START) {
        tileID = game.activePlayer!.path.get(game.rollVal! - 1);
    } else {
        const tokenPos = game.activePlayer!.tokens[token];
        tileID = game.activePlayer!.path.get(game.rollVal! + tokenPos);
    }

    client.emit('tileHighlight', tileID);
};

const handleTokenClick = (
    client: Socket,
    server: Server,
    tokenOwnerID: PlayerID,
    token: number
) => {
    const roomID = clientData[client.id].room;
    const playerID = clientData[client.id].playerID;
    const game = state[roomID];

    if (!game.isMovePossible(tokenOwnerID, token) || tokenOwnerID !== playerID)
        return;

    if (token === constants.PLAYER_START) {
        token = game.activePlayer!.tokens.findIndex(
            (tokenPos) => tokenPos === constants.PLAYER_START
        );
    }

    const newPos = game.activePlayer!.moveToken(token, game.rollVal!);
    game.checkForCaptures();

    if (newPos === null) return;

    game.handleNewTokenPosition(newPos);
    game.updateBoard();

    server.sockets.in(roomID).emit('updateState', game);
    updateGamePhaseNotification(server, game, roomID);
};

const handleReset = (client: Socket, server: Server) => {
    const roomID = clientData[client.id].room;
    const game = state[roomID];

    game.reset();
    game.updateBoard();

    server.sockets.in(roomID).emit('updateState', game);
    updateGamePhaseNotification(server, game, roomID);
};

const updateGamePhaseNotification = (
    server: Server,
    game: Game,
    roomID: string
) => {
    if (!game.activePlayer) return;
    const activePlayerNum = game.activePlayer.id! + 1;
    if (game.phase === 'movement') {
        server.sockets.in(roomID).emit('notification', {
            msg: `Player ${activePlayerNum}'s Move`,
        });
    } else if (game.phase === 'rolling') {
        server.sockets.in(roomID).emit('notification', {
            msg: `Player ${activePlayerNum}'s Roll`,
        });
    } else if (game.phase === 'gameOver') {
        server.sockets.in(roomID).emit('notification', {
            msg: `Player ${activePlayerNum} Wins!`,
        });
    }
};

export {
    handleNewGame,
    handleJoinGame,
    handleRollDice,
    handleTokenClick,
    handleTokenHover,
    handleReset,
    handleLeaveGame,
    state,
    clientData,
};
