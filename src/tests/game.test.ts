import { Game } from '../game';

test('Game class to instantiate an object', () => {
  expect(typeof new Game()).toBe('object');
});
