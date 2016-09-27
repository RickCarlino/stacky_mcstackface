/// <reference path="../typings/index.d.ts" />
"use strict";
var compiler_1 = require("../compiler");
var vm_1 = require("../vm");
describe("Compiler", function () {
    var compile = compiler_1.Compiler();
    it("turns text into an array of instruction opcodes", function () {
        var program = compile("\n    PUSH 123\n    noOp\n    ");
        expect(program).toEqual([
            vm_1.VM.INSTRUCTIONS.fetchOpcode("push"),
            123,
            vm_1.VM.INSTRUCTIONS.fetchOpcode("noop")
        ]);
    });
});
