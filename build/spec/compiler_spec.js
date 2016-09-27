/// <reference path="../typings/index.d.ts" />
"use strict";
var compiler_1 = require("../compiler");
var instruction_set_1 = require("../instruction_set");
describe("Compiler", function () {
    var compile = compiler_1.Compiler(instruction_set_1.defaultIntstructionSet);
    it("turns text into an array of instruction opcodes", function () {
        var program = compile("\n    PUSH 123\n    noOp\n    ");
        expect(program).toEqual([
            instruction_set_1.defaultIntstructionSet.fetchOpcode("push"),
            123,
            instruction_set_1.defaultIntstructionSet.fetchOpcode("noop")
        ]);
    });
});
