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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
var react_1 = __importDefault(require("react"));
var api = __importStar(require("../api"));
var LandingPage_1 = require("./LandingPage");
var WaitingRoom_1 = require("./WaitingRoom");
var Game_1 = require("./Game");
var NotificationPanel_1 = require("./NotificationPanel");
var LeaveButton_1 = require("./LeaveButton");
var View = function (_a) {
    var gameState = _a.gameState, roomID = _a.roomID, notification = _a.notification, highlightedTile = _a.highlightedTile;
    var view;
    if (!gameState && !roomID) {
        view = (<LandingPage_1.LandingPage createNewGame={api.handleCreateNewGame} joinGame={api.handleJoinGame}>
        <NotificationPanel_1.NotificationPanel notification={notification} gridPlacement={'bottom-center'}/>
      </LandingPage_1.LandingPage>);
    }
    else if (!gameState && roomID) {
        view = (<WaitingRoom_1.WaitingRoom roomID={roomID}>
        <LeaveButton_1.LeaveButton leaveGame={api.handleLeaveGame}/>
        <NotificationPanel_1.NotificationPanel notification={notification}/>
      </WaitingRoom_1.WaitingRoom>);
    }
    else if (gameState && roomID) {
        view = (<Game_1.GameComponent notification={notification} gameState={gameState} handleTokenClick={api.handleTokenClick} handleTokenHover={api.handleTokenHover} highlightedTile={highlightedTile} rollDice={api.handleRollDice} resetGame={api.handleResetGame} leaveGame={api.handleLeaveGame}/>);
    }
    return <>{view}</>;
};
exports.View = View;
