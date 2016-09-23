import { VM } from "./vm";
import { Compiler } from "./compiler";

// Instantiate a 64 word (128 byte) virtual machine.
    let vm = new VM(64); // 64 words (16 bit each).

// Create a compiler using a known instruction set.
    let compileFn = Compiler(VM.DEFAULT_INSTRUCTION_SET);
// Compile text source code into numeric byte code.
    let program = compileFn(`PUSH 1 PUSH 5 ADD 4 SUB`);
    // => [ 2, 1, 2, 5, 8, 4, 9 ];
// Load the VM.
   vm.load(program);
// Execute "cycles"
    vm.tick(); // => PUSH 1
    vm.tick(); // => PUSH 5
    vm.tick(); // => ADD  4
    vm.tick(); // => SUB
