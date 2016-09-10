/// <reference path="../../typings/index.d.ts" />

import { Instruction } from "../instruction";
import { InstructionSet } from "../instruction_set";
import { VM } from "../vm";

describe("Instruction Set", function() {
  it("Initializes an instruction set", function() {
    const vm = new VM(4);
    expect(vm.buffer.toString()).toEqual("0,0,0,0");
    const i = new InstructionSet();
    expect(() => i.exec(0, vm)).toThrow();
    expect(vm.buffer.toString()).toEqual("0,0,0,0");
    i.add("wow", (v) => v.buffer[1] = 1);
    i.exec(i.fetchOpcode("wow"), vm);
    expect(vm.buffer[1]).toEqual(1);
  });

})
