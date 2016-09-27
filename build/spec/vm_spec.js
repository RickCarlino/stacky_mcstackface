/// <reference path="../typings/index.d.ts" />
"use strict";
var vm_1 = require("../vm");
function freshVM(size) {
    if (size === void 0) { size = 100; }
    return new vm_1.VM(size);
}
describe("Virtual Machine", function () {
    it("Initializes with specified size", function () {
        var vm = new vm_1.VM(200);
        expect(vm.SIZE).toEqual(200);
        expect(vm.buffer.length).toEqual(200);
        expect(vm.END_ADDRESS).toEqual(199);
        expect(vm.IP).toEqual(vm.START_ADDRESS);
    });
    it("Initializes to a default size", function () {
        var vm = new vm_1.VM();
        expect(vm.SIZE).toEqual(vm_1.VM.DEFAULT_SIZE);
    });
});
