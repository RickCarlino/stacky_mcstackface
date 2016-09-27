"use strict";
var vm_1 = require("../vm");
var compiler_1 = require("../compiler");
var compile = compiler_1.Compiler();
function run(code, vm) {
    if (vm === void 0) { vm = new vm_1.VM(64); }
    var program = compile(code);
    vm.load(program);
    return vm;
}
exports.run = run;
function dump(vm) {
    var ret = [];
    var line = "---------------------------------\n";
    var str = ("IP: " + vm.IP + " / PSP: " + vm.PSP + " / RSP: " + vm.RSP + "\n") + line;
    [
        [0, 8],
        [8, 16],
        [16, 24],
        [24, 32],
        [32, 40],
        [40, 48],
        [48, 56],
        [56, 64]
    ].forEach(function (slice) {
        var start = slice[0], end = slice[1];
        var row = [];
        vm
            .buffer
            .slice(start, end)
            .forEach(function (i) { row.push(("___" + i).slice(-3)); });
        str += ("|" + row.join("|") + "|\n");
    });
    console.log(str);
}
exports.dump = dump;
function inspectFirst(x, vm) {
    console.log(vm.buffer.slice(0, x));
}
exports.inspectFirst = inspectFirst;
