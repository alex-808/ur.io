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
var react_1 = __importStar(require("react"));
var api = __importStar(require("./api"));
require("./App.scss");
var View_1 = require("./components/View");
function App() {
    var _a = (0, react_1.useState)(null), gameState = _a[0], setGameState = _a[1];
    var _b = (0, react_1.useState)(''), roomID = _b[0], setRoomID = _b[1];
    var _c = (0, react_1.useState)(''), notification = _c[0], setNotification = _c[1];
    var _d = (0, react_1.useState)(null), highlightedTile = _d[0], setHighlightedTile = _d[1];
    (0, react_1.useEffect)(function () {
        api.socket.on('roomID', function (ID) {
            setRoomID(ID);
        });
        api.socket.on('init', function (state) {
            updateState(state);
        });
        api.socket.on('updateState', function (state) {
            updateState(state);
        });
        api.socket.on('notification', function (_a) {
            var msg = _a.msg;
            setNotification(msg);
        });
        api.socket.on('tileHighlight', function (tile) {
            setHighlightedTile(tile);
        });
    }, []);
    var updateState = function (state) {
        setGameState(state);
        setHighlightedTile(null);
    };
    return (<div className="App">
      <View_1.View gameState={gameState} roomID={roomID} notification={notification} highlightedTile={highlightedTile}/>
    </div>);
}
exports.default = App;
