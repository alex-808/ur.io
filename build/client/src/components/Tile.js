"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
var react_1 = __importDefault(require("react"));
var Token_1 = require("./Token");
// what is the best way to temporarily highlight something only as long as it is hovered on? onMouseExit too?
var Tile = function (_a) {
    var oc = _a.oc, token = _a.token, type = _a.type, index = _a.index, handleTokenClick = _a.handleTokenClick, handleTokenHover = _a.handleTokenHover, highlightedTile = _a.highlightedTile;
    var className = index === highlightedTile ? 'highlighted ' : '';
    switch (type) {
        case 'normal':
            if (index % 2 === 0) {
                className += 'tile-style-1';
            }
            else {
                className += 'tile-style-0';
            }
            break;
        case 'rosette':
            className += 'rosette';
            break;
        case 'goal':
            className += 'goal';
            break;
    }
    return (<div className={className + " centering"} onClick={handleTokenClick.bind(null, oc, token)} onMouseEnter={handleTokenHover.bind(null, oc, token)} onMouseLeave={handleTokenHover.bind(null, null, null)}>
      {oc !== null ? <Token_1.Token playerID={oc}/> : <div></div>}
    </div>);
};
exports.Tile = Tile;
