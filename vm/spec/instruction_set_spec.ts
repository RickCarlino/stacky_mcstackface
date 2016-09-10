/// <reference path="../../typings/index.d.ts" />

import { Instruction } from "../instruction";
import { InstructionSet } from "../instruction_set";

import { VM } from "../vm";

describe("Instruction Set", function() {
  it("Initializes an instruction set", function() {
    const vm = new VM(4);
    expect(vm.buffer.toString()).toEqual("0,0,0,0");
    const i = new InstructionSet();
    i.exec(0, vm); // 0 is NO OPERATION
    expect(vm.buffer.toString()).toEqual("0,0,0,0");
    i.add("SET_0_TO_1", v => v.buffer.set(0, 1));
    i.exec(i.fetchOpcode("SET_0_TO_1"), vm);
    expect(vm.buffer[1]).toEqual(1);
    
  });

})
