const BOARD_SIZE = 21;
const GOAL_TILE = 13;
const ROSETTE_TILES = [3, 7, 11];
const PLAYER_START = -1;
const MIDLANE_START = 4;
const MIDLANE_END = 10;
const PLAYER_0_PATH = new Map([
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

const PLAYER_1_PATH = new Map([
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

export {
  BOARD_SIZE,
  GOAL_TILE,
  ROSETTE_TILES,
  PLAYER_START,
  MIDLANE_START,
  MIDLANE_END,
  PLAYER_0_PATH,
  PLAYER_1_PATH,
};
