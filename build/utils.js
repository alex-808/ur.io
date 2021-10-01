"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeID = void 0;
var makeID = function (number) {
    var arr = [];
    for (var i = 0; i < number; i++) {
        var digit = Math.floor(Math.random() * 10);
        arr.push(digit);
    }
    return arr.join('');
};
exports.makeID = makeID;
