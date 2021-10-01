"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerWins = void 0;
var react_1 = __importDefault(require("react"));
var PlayerWins = function (_a) {
    var player = _a.player, gameWinners = _a.gameWinners;
    var calcWinCount = function (playerID, gameWinnersArr) {
        var winCount = 0;
        gameWinnersArr.forEach(function (winner) {
            if (winner === playerID) {
                winCount++;
            }
        });
        return winCount;
    };
    var winCount = calcWinCount(player.id, gameWinners);
    return <p className={"Player" + player.id + "Wins"}>Wins: {winCount}</p>;
};
exports.PlayerWins = PlayerWins;
