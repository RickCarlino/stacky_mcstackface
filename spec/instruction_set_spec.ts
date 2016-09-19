/// <reference path="../typings/index.d.ts" />

import { Instruction } from "../instruction";
import { InstructionSet } from "../instruction_set";
import { VM } from "../vm";

describe("Instruction Set", function() {
  it("initializes default instruction set", function() {
    const vm = new VM(64);
    [0, 5, 17, 37, 63].forEach(function(num) {
      // spot check...
      expect(vm.buffer[num]).toEqual(0);
    });
    const i = new InstructionSet();
    expect(() => i.exec(0, vm)).toThrow();
    i.add("wow", (v) => v.buffer[1] = 1);
    i.exec(i.fetchOpcode("wow"), vm);
    expect(vm.buffer[1]).toEqual(1);
  });

})
