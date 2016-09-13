/// <reference path="../typings/index.d.ts" />

import { VM } from "../vm";
import { Compiler } from "../compiler";
import { run } from "./helpers";

describe("Default instructions", function() {

  it("has a PUSH instruction", function() {
    let vm = run("PUSH 1 pUsH 2 PUsh 3");
    vm.tick();
    vm.tick();
    vm.tick();
    expect(vm.END_ADDRESS).toBeGreaterThan(vm.PSP);
    expect(vm.PSP).toEqual(vm.END_ADDRESS - 3);
    expect(vm.buffer[vm.END_ADDRESS]).toEqual(
      1,
      "I pushed 1 onto the stack. Therefore, I expected one to be the element at the bottom of the stack.");
    expect(vm.buffer[vm.PSP]).toEqual(0,
      "Stack pointer should point to the next available stack slot.");
    expect(vm.buffer[vm.PSP + 1]).toEqual(3,
      "Expected last PUSHed value to be one address under stack pointer.");
  });

})
