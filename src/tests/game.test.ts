import { Game } from '../game';

test('Game class to instantiate an object', () => {
  expect(typeof new Game()).toBe('object');
});

test('initial game phase is "rolling"', () => {
  const game = new Game();
  expect(game.phase).toBe('rolling');
});

test('.addPlayerMethod increments .players arr by 1', () => {
  const game = new Game();
  game.addPlayer();
  game.addPlayer();
  expect(game.players.length).toBe(2);
});

test('.rollDice returns an arr of two values', () => {
  const game = new Game();
  const rollVal = game.rollDice();
  expect(rollVal!.length).toBe(2);
  expect(typeof rollVal).toBe('object');
});

test('initializeBoard returns an array', () => {
  const game = new Game();
  const board = game.initializeBoard();
  expect(typeof board).toBe('object');
});

test('rollDice sets rollVal', () => {
  const game = new Game();
  expect(game.rollVal).toBeNull();
  game.rollDice();
  expect(game.rollVal).not.toBeNull();
});
