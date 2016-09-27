"use strict";
var instruction_set_1 = require("./instruction_set");
/** Converts a block of text into a cleaned array of tokens. */
function tokenize(input) {
    return input
        .split(/\s+/)
        .filter(function (w) { return w !== ""; });
}
/** Turns an array of tokens into a list of op codes. */
function parse(tokens, instructionSet) {
    return tokens.map(function (token) {
        var num = parseInt(token);
        var isNumber = !isNaN(num);
        if (isNumber) {
            // TODO : Validate that number does not cause an overflow.
            return num;
        }
        else {
            return instructionSet.fetchOpcode(token.toUpperCase());
        }
    });
}
// TODO: Add support for labels when jumping.
/** Generate a compiler function that can convert text chunks into arrays of
 * op codes. */
exports.Compiler = function (i) {
    if (i === void 0) { i = instruction_set_1.defaultIntstructionSet; }
    return function (input) {
        var tokens = tokenize(input);
        var program = parse(tokens, i);
        return program;
    };
};
