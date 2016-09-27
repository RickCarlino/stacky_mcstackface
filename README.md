# Stack Machine VM

A stack based virtual machine and compiler based off of [the instruction set outlined in this book](https://users.ece.cmu.edu/~koopman/stack_computers/sec3_2.html).


# Rationale and Design Considerations

 * I wanted to write my own FORTH, but didn't want to go through the trouble of learning a real assembly environment.
 * You don't tell me what to do! IM JUST HAVING FUN OK!?

# Architecture

 * `vm.IP`  - Next instruction that will be processed if you execute `vm.tick()`.
 * `vm.RSP` - Points to next free slot in the return stack.
 * `vm.PSP` - Points to next free slot in the parameter stack. Often just called "The Stack".

# Road Map

 - [X] Memory.
 - [X] Really basic compiler.
 - [X] Instruction set.
 - [ ] Add support for labels to compiler.
 - [ ] Interupts.
 - [ ] I/O.
 - [ ] FORTH compiler.

# Installation

 1. `npm install`
 2. `typings install`
 3. (Optional) `npm test` to verify installation.

# Usage

```typescript

import { VM, Compiler } from "stacky_mcstackface";

// Instantiate a 64 word (128 byte) virtual machine.
    let vm = new VM(64); // 64 words (16 bit each).

// Create a compiler instance.
    let compileFn = Compiler();

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

```

# Instruction Set

See documentation in `default_instructions.ts`.