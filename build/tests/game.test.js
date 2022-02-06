"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("../game");
test('Game class to instantiate an object', function () {
    expect(typeof new game_1.Game()).toBe('object');
});
test('initial game phase is "rolling"', function () {
    var game = new game_1.Game();
    expect(game.phase).toBe('rolling');
});
test('.addPlayerMethod increments .players arr by 1', function () {
    var game = new game_1.Game();
    game.addPlayer();
    game.addPlayer();
    expect(game.players.length).toBe(2);
});
test('.rollDice returns an arr of two values', function () {
    var game = new game_1.Game();
    var rollVal = game.rollDice();
    expect(rollVal.length).toBe(2);
    expect(typeof rollVal).toBe('object');
});
test('initializeBoard returns an array', function () {
    var game = new game_1.Game();
    var board = game.initializeBoard();
    expect(typeof board).toBe('object');
});
test('rollDice sets rollVal', function () {
    var game = new game_1.Game();
    expect(game.rollVal).toBeNull();
    game.rollDice();
    expect(game.rollVal).not.toBeNull();
});
