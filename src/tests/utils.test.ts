import { makeID } from '../utils';

test('id is a string', () => {
  expect(typeof makeID(5)).toBe('string');
});

test('id is of length specified by parameter', () => {
  expect(makeID(5).length).toBe(5);
});
