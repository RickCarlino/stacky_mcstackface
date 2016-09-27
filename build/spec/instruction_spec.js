/// <reference path="../typings/index.d.ts" />
"use strict";
var instruction_1 = require("../instruction");
var vm_1 = require("../vm");
describe("Instruction", function () {
    it("Initializes an instruction", function () {
        var vm = new vm_1.VM(500);
        var i = new instruction_1.Instruction(4, "set_addr_1_to_222", function (vm) {
            vm.buffer[1] = 222;
        });
        expect(vm.buffer[1]).not.toEqual(222);
        i.call(vm);
        expect(vm.buffer[1]).toEqual(222);
    });
});
