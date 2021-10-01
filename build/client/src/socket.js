"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
var socket = (0, socket_io_client_1.default)(url);
exports.socket = socket;
