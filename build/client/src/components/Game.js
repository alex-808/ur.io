"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameComponent = void 0;
var react_1 = __importDefault(require("react"));
var PlayerStart_1 = require("./PlayerStart");
var PlayerScore_1 = require("./PlayerScore");
var Board_1 = require("./Board");
var NotificationPanel_1 = require("./NotificationPanel");
var LeaveButton_1 = require("./LeaveButton");
var GameComponent = function (_a) {
    var gameState = _a.gameState, handleTokenClick = _a.handleTokenClick, handleTokenHover = _a.handleTokenHover, highlightedTile = _a.highlightedTile, rollDice = _a.rollDice, resetGame = _a.resetGame, notification = _a.notification, leaveGame = _a.leaveGame;
    if (!gameState)
        return <div>Error: No State</div>;
    return (<>
      <LeaveButton_1.LeaveButton leaveGame={leaveGame}/>
      <PlayerStart_1.PlayerStart player={gameState.players[0]} onClick={handleTokenClick} onHover={handleTokenHover}/>
      <PlayerScore_1.PlayerScore activePlayer={gameState.activePlayer} player={gameState.players[0]} gameWinners={gameState.gameWinners}/>
      <NotificationPanel_1.NotificationPanel notification={notification}/>
      <Board_1.Board tiles={gameState.board} handleTokenClick={handleTokenClick} handleTokenHover={handleTokenHover} highlightedTile={highlightedTile}/>
      <div className="game-buttons">
        <button className={gameState.phase !== 'gameOver' ? 'game-button' : 'invisible'} onClick={rollDice}>
          {gameState.phase !== 'rolling' ? gameState.rollVal : 'Roll'}
        </button>
        <button className={gameState.phase !== 'gameOver' ? 'invisible' : 'game-button'} onClick={resetGame}>
          New Game
        </button>
      </div>

      <PlayerStart_1.PlayerStart player={gameState.players[1]} onClick={handleTokenClick} onHover={handleTokenHover}/>
      <PlayerScore_1.PlayerScore activePlayer={gameState.activePlayer} player={gameState.players[1]} gameWinners={gameState.gameWinners}/>
    </>);
};
exports.GameComponent = GameComponent;
