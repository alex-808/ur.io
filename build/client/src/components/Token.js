"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
var react_1 = __importDefault(require("react"));
var Token = function (_a) {
    var playerID = _a.playerID;
    return <div className={"player-" + playerID + "-token"}></div>;
};
exports.Token = Token;
