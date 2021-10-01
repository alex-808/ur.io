"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var react_1 = __importDefault(require("react"));
var Tile_1 = require("./Tile");
var Board = function (_a) {
    var tiles = _a.tiles, handleTokenClick = _a.handleTokenClick, handleTokenHover = _a.handleTokenHover, highlightedTile = _a.highlightedTile;
    console.log(highlightedTile);
    return (<div className="board">
      {tiles.map(function (tile, i) { return (<Tile_1.Tile oc={tile.oc} type={tile.type} index={i} token={tile.token} key={i} handleTokenClick={handleTokenClick} handleTokenHover={handleTokenHover} highlightedTile={highlightedTile}/>); })}
    </div>);
};
exports.Board = Board;
