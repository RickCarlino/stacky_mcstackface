"use strict";
var vm_1 = require("./vm");
var compiler_1 = require("./compiler");
// Instantiate a 64 word (128 byte) virtual machine.
var vm = new vm_1.VM(64); // 64 words (16 bit each).
// Create a compiler using a known instruction set.
var compileFn = compiler_1.Compiler(vm_1.VM.INSTRUCTIONS);
// Compile text source code into numeric byte code.
var program = compileFn("PUSH 1 PUSH 5 ADD 4 SUB");
// => [ 2, 1, 2, 5, 8, 4, 9 ];
// Load the VM.
vm.load(program);
// Execute "cycles"
vm.tick(); // => PUSH 1
vm.tick(); // => PUSH 5
vm.tick(); // => ADD  4
vm.tick(); // => SUB
