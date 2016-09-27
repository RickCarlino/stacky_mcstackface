/// <reference path="../typings/index.d.ts" />
"use strict";
var instruction_set_1 = require("../instruction_set");
var vm_1 = require("../vm");
describe("Instruction Set", function () {
    it("initializes default instruction set", function () {
        var vm = new vm_1.VM(64);
        [0, 5, 17, 37, 63].forEach(function (num) {
            // spot check...
            expect(vm.buffer[num]).toEqual(0);
        });
        var i = new instruction_set_1.InstructionSet();
        expect(function () { return i.exec(0, vm); }).toThrow();
        i.add("wow", function (v) { return v.buffer[1] = 1; });
        i.exec(i.fetchOpcode("wow"), vm);
        expect(vm.buffer[1]).toEqual(1);
    });
});
