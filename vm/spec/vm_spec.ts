/// <reference path="../../typings/index.d.ts" />

import { VM } from "../vm";

function freshVM(size: number = 100) {
  return new VM(size);
}

describe("Virtual Machine", function() {
  it("Initializes with specified size", function() {
    const vm = new VM(200);

    expect(vm.SIZE).toEqual(200);
    expect(vm.buffer.length).toEqual(200);
    expect(vm.END_ADDRESS).toEqual(199);
    expect(vm.IP).toEqual(vm.START_ADDRESS);
  });

  it("Initializes to a default size", function() {
    const vm = new VM();
    expect(vm.SIZE).toEqual(VM.DEFAULT_SIZE);
  });
})
