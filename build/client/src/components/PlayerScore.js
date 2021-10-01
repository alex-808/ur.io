"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerScore = void 0;
var react_1 = __importDefault(require("react"));
var PlayerWins_1 = require("./PlayerWins");
var PlayerScore = function (_a) {
    var player = _a.player, activePlayer = _a.activePlayer, gameWinners = _a.gameWinners;
    return (<div className={"player" + player.id + "Score\n      "} style={{ color: 'black', fontSize: '30px' }}>
      <div className={"" + (player.id === (activePlayer === null || activePlayer === void 0 ? void 0 : activePlayer.id) ? 'active' : '')}>
        {player.score}
      </div>
      <PlayerWins_1.PlayerWins player={player} gameWinners={gameWinners}/>
    </div>);
};
exports.PlayerScore = PlayerScore;
