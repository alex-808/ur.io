"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAYER_1_PATH = exports.PLAYER_0_PATH = exports.MIDLANE_END = exports.MIDLANE_START = exports.PLAYER_START = exports.ROSETTE_TILES = exports.GOAL_TILE = exports.BOARD_SIZE = void 0;
var BOARD_SIZE = 21;
exports.BOARD_SIZE = BOARD_SIZE;
var GOAL_TILE = 13;
exports.GOAL_TILE = GOAL_TILE;
var ROSETTE_TILES = [3, 7, 11];
exports.ROSETTE_TILES = ROSETTE_TILES;
var PLAYER_START = -1;
exports.PLAYER_START = PLAYER_START;
var MIDLANE_START = 4;
exports.MIDLANE_START = MIDLANE_START;
var MIDLANE_END = 10;
exports.MIDLANE_END = MIDLANE_END;
var PLAYER_0_PATH = new Map([
    [0, 9],
    [1, 6],
    [2, 3],
    [3, 0],
    [4, 1],
    [5, 4],
    [6, 7],
    [7, 10],
    [8, 13],
    [9, 16],
    [10, 19],
    [11, 18],
    [12, 15],
    [13, 12],
]);
exports.PLAYER_0_PATH = PLAYER_0_PATH;
var PLAYER_1_PATH = new Map([
    [0, 11],
    [1, 8],
    [2, 5],
    [3, 2],
    [4, 1],
    [5, 4],
    [6, 7],
    [7, 10],
    [8, 13],
    [9, 16],
    [10, 19],
    [11, 20],
    [12, 17],
    [13, 14],
]);
exports.PLAYER_1_PATH = PLAYER_1_PATH;
