"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
test('id is a string', function () {
    expect(typeof (0, utils_1.makeID)(5)).toBe('string');
});
test('id is of length specified by parameter', function () {
    expect((0, utils_1.makeID)(5).length).toBe(5);
});
