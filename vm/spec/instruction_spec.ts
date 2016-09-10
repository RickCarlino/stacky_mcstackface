/// <reference path="../../typings/index.d.ts" />

import { Instruction } from "../instruction";
import { VM } from "../vm";

describe("Instruction", function() {
  it("Initializes an instruction", function() {
    const vm = new VM(500);
    const i = new Instruction(4, "set_addr_1_to_222", function(vm) {
      vm.buffer[1] = 222;
    });
    
    expect(vm.buffer[1]).not.toEqual(222);

    i.call(vm);

    expect(vm.buffer[1]).toEqual(222);
    
  });

})
