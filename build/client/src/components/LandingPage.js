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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPage = void 0;
var react_1 = __importStar(require("react"));
var LandingPage = function (_a) {
    var createNewGame = _a.createNewGame, joinGame = _a.joinGame, children = _a.children;
    var _b = (0, react_1.useState)(''), joinRoomID = _b[0], setJoinRoomID = _b[1];
    var handleInputChange = function (event) {
        var inputEl = event.target;
        setJoinRoomID(inputEl.value);
        console.log(inputEl.value);
    };
    return (<>
      <header className="landing-header centering">
        Game of Ur (with friends)
        <span className="material-icons">face</span>
      </header>
      {children}
      <div className="session-buttons">
        <div>
          <span>Start a </span>
          <button className="button" onClick={createNewGame}>
            New Game
          </button>
        </div>
        <div>or </div>
        <div>
          <div>Enter room code to</div>
          <input onChange={handleInputChange}></input>
          <button className="button" onClick={joinGame.bind(null, joinRoomID)}>
            Join Game
          </button>
        </div>
      </div>
    </>);
};
exports.LandingPage = LandingPage;
