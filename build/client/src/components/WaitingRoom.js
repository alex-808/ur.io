"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitingRoom = void 0;
var react_1 = __importDefault(require("react"));
var WaitingRoom = function (_a) {
    var roomID = _a.roomID, children = _a.children;
    return (<>
      {children}
      <span className="waiting-room">
        <div>Waiting Room</div>
        <span className="roomID">{roomID}</span>
      </span>
    </>);
};
exports.WaitingRoom = WaitingRoom;
