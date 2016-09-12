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
    console.log("=========", vm.buffer.slice(Math.max(vm.buffer.length - 5, 1)))
    expect(vm.buffer[vm.END_ADDRESS]).toEqual(1);
    expect(vm.buffer[vm.PSP]).toEqual(3);
  });

})
