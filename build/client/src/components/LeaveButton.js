"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveButton = void 0;
var react_1 = __importDefault(require("react"));
var LeaveButton = function (_a) {
    var leaveGame = _a.leaveGame;
    return (<div className="centering">
      <button className="button centering" onClick={leaveGame}>
        <span className="material-icons">logout</span>
        Leave Room
      </button>
    </div>);
};
exports.LeaveButton = LeaveButton;
