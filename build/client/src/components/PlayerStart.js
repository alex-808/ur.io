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
exports.PlayerStart = void 0;
var react_1 = __importDefault(require("react"));
var constants = __importStar(require("../constants"));
var Token_1 = require("./Token");
var PlayerStart = function (_a) {
    var player = _a.player, onClick = _a.onClick, onHover = _a.onHover;
    return (<div className={"player" + player.id + "Start"} onClick={onClick.bind(null, player.id, constants.PLAYER_START)} onMouseEnter={onHover.bind(null, player.id, constants.PLAYER_START)} onMouseLeave={onHover.bind(null, null, null)}>
      {player.tokens
            .filter(function (token) { return token === -1; })
            .map(function (token) { return (<Token_1.Token key={Math.random()} playerID={player.id}/>); })}
    </div>);
};
exports.PlayerStart = PlayerStart;
