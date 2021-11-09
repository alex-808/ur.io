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
exports.Game = void 0;
var constants = __importStar(require("./constants"));
var Tile = /** @class */ (function () {
    function Tile(type) {
        this.type = type;
        this.oc = null;
        this.token = null;
    }
    return Tile;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.players = [];
        this.phase = 'rolling';
        this.activePlayer = null;
        this.board = this.initializeBoard();
        this.rollVal = null;
        this.gameWinners = [];
    }
    Game.prototype.initializeBoard = function () {
        var board = [];
        var player0Goal = constants.PLAYER_0_PATH.get(constants.GOAL_TILE);
        var player1Goal = constants.PLAYER_1_PATH.get(constants.GOAL_TILE);
        var player0Rosettes = constants.ROSETTE_TILES.map(function (val) {
            return constants.PLAYER_0_PATH.get(val);
        });
        var player1Rosettes = constants.ROSETTE_TILES.map(function (val) {
            return constants.PLAYER_1_PATH.get(val);
        });
        for (var i = 0; i < constants.BOARD_SIZE; i++) {
            // would need to convert these to each player path first
            if (player0Rosettes.includes(i) || player1Rosettes.includes(i)) {
                board.push(new Tile('rosette'));
            }
            else if (i === player0Goal || i === player1Goal) {
                board.push(new Tile('goal'));
            }
            else {
                board.push(new Tile('normal'));
            }
        }
        return board;
    };
    Game.prototype.AreNoMoves = function () {
        var _this = this;
        if (!this.activePlayer || !this.rollVal)
            return;
        var immovableTokens = 0;
        this.activePlayer.tokens.forEach(function (tokenPos) {
            if (tokenPos + _this.rollVal > constants.GOAL_TILE ||
                _this.activePlayer.tokens.includes(tokenPos + _this.rollVal)) {
                immovableTokens++;
            }
        });
        if (immovableTokens === this.activePlayer.tokens.length)
            return true;
        return false;
    };
    Game.prototype.reset = function () {
        var winnerID = this.activePlayer.id;
        this.gameWinners.push(winnerID);
        console.table(this.gameWinners);
        this.players[0] = new Player(0);
        this.players[1] = new Player(1);
        this.rollVal = null;
        this.phase = 'rolling';
        if (this.gameWinners.length % 2)
            this.activePlayer = this.players[1];
        else
            this.activePlayer = this.players[0];
    };
    Game.prototype.addPlayer = function () {
        if (this.players.length < 2) {
            var player = new Player(this.players.length);
            this.players.push(player);
            if (player.id === 0)
                this.activePlayer = player;
        }
    };
    Game.prototype.rollDice = function () {
        console.log(this.phase);
        if (this.phase !== 'rolling')
            return;
        var val1 = Math.floor(Math.random() * 3);
        var val2 = Math.floor(Math.random() * 3);
        this.rollVal = val1 + val2;
        //this.rollVal = 0;
        return [val1, val2];
    };
    //TODO try to get this to be used in handleTokenClick
    Game.prototype.isMovePossible = function (playerID, token) {
        var _a;
        if (playerID !== ((_a = this.activePlayer) === null || _a === void 0 ? void 0 : _a.id) ||
            !this.rollVal ||
            token === null ||
            this.phase !== 'movement' ||
            !this.activePlayer) {
            return false;
        }
        return true;
    };
    Game.prototype.updateBoard = function () {
        for (var _i = 0, _a = this.board; _i < _a.length; _i++) {
            var tile = _a[_i];
            tile.oc = null;
            tile.token = null;
        }
        for (var _b = 0, _c = this.players; _b < _c.length; _b++) {
            var player = _c[_b];
            var path = player.id === 0 ? constants.PLAYER_0_PATH : constants.PLAYER_1_PATH;
            for (var _d = 0, _e = player.tokens; _d < _e.length; _d++) {
                var tokenPos = _e[_d];
                if (tokenPos === constants.PLAYER_START)
                    continue;
                var boardVal = path.get(tokenPos);
                if (boardVal !== undefined) {
                    this.board[boardVal].oc = player.id;
                    this.board[boardVal].token = player.tokens.indexOf(tokenPos);
                }
            }
        }
    };
    Game.prototype.checkForCaptures = function () {
        var _this = this;
        if (!this.activePlayer || !this.activePlayer.tokens)
            return;
        var opponent = this.activePlayer.id === 0 ? this.players[1] : this.players[0];
        var _loop_1 = function (i) {
            var match = opponent.tokens.findIndex(function (tokenPos) {
                return tokenPos >= constants.MIDLANE_START &&
                    tokenPos <= constants.MIDLANE_END &&
                    tokenPos === _this.activePlayer.tokens[i];
            });
            if (match !== -1) {
                opponent.tokens[match] = constants.PLAYER_START;
            }
        };
        for (var i = 0; i < this.activePlayer.tokens.length; i++) {
            _loop_1(i);
        }
    };
    Game.prototype.checkForGameOver = function () {
        var _a;
        if (((_a = this.activePlayer) === null || _a === void 0 ? void 0 : _a.tokens.length) === 0) {
            this.phase = 'gameOver';
        }
    };
    Game.prototype.handleNewTokenPosition = function (tokenPosition) {
        if (tokenPosition === constants.GOAL_TILE) {
            this.activePlayer.scoreGoal();
            this.checkForGameOver();
        }
        else if (!constants.ROSETTE_TILES.includes(tokenPosition)) {
            this.changeTurn();
        }
        else {
            this.phase = 'rolling';
        }
    };
    Game.prototype.changeTurn = function () {
        console.log('turn changed');
        if (this.activePlayer === this.players[0])
            this.activePlayer = this.players[1];
        else
            this.activePlayer = this.players[0];
        this.phase = 'rolling';
    };
    return Game;
}());
exports.Game = Game;
var Player = /** @class */ (function () {
    function Player(id) {
        this.id = id;
        this.path = this.id === 0 ? constants.PLAYER_0_PATH : constants.PLAYER_1_PATH;
        this.tokens = [
            constants.PLAYER_START,
            constants.PLAYER_START,
            constants.PLAYER_START,
            constants.PLAYER_START,
            constants.PLAYER_START,
            constants.PLAYER_START,
            constants.PLAYER_START,
            constants.PLAYER_START,
        ];
        this.score = 0;
    }
    Player.prototype.scoreGoal = function () {
        this.tokens = this.tokens.filter(function (tokenPos) { return tokenPos !== constants.GOAL_TILE; });
        this.score++;
    };
    Player.prototype.moveToken = function (tokenIndex, rollVal) {
        var newPos = this.tokens[tokenIndex] + rollVal;
        if (this.tokens.includes(newPos) || newPos > constants.GOAL_TILE)
            return null;
        this.tokens[tokenIndex] = newPos;
        return newPos;
    };
    return Player;
}());
