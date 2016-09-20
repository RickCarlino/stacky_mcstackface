/// <reference path="../typings/index.d.ts" />

import { VM } from "../vm";
import { Compiler } from "../compiler";
import { run, dump } from "./helpers";


describe("Default instructions", function () {
  it("has a NOOP instruction", () => {
    let vm = run("nooP Noop NOOP");
    let startIP = vm.IP;
    vm.tick();
    vm.tick();
    vm.tick();
    let endIP = vm.IP;
    expect(endIP).toEqual(startIP + 3,
      "A NOOP instruction should increment the instruction pointer each time it is called.");
    expect(vm.PSP).toEqual(vm.END_ADDRESS,
      "The NOOP instruction has no stack effect.");
  });

  it("has a PUSH instruction", function () {
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

  it("has a STORE instruction", () => {
    let vm = run(`
    push 34
    push 12
    store
    `);
    let startIP = vm.IP;
    let startPSP = vm.PSP;
    vm.tick();
    vm.tick();
    vm.tick();
    let endIP = vm.IP;
    let endPSP = vm.PSP;
    expect(startPSP).toEqual(vm.END_ADDRESS);
    expect(endIP).toEqual((startIP + 5),
      "Push increments the stack 2x. Store 1x. Push + push + store = 5 IP incrementations.");
    expect(vm.PSP).toEqual(vm.END_ADDRESS,
      "The STORE instruction should clear the last two stack items.");
    expect(vm.buffer[12]).toEqual(34);
  });

  it("has a FETCH instruction", () => {
    let vm = run(`
    push 13
    push 8
    store
    push 8
    fetch
    `);
    let startIP = vm.IP;
    let startPSP = vm.PSP;
    vm.tick();
    vm.tick();
    vm.tick();
    vm.tick();
    vm.tick();
    let endIP = vm.IP;
    let endPSP = vm.PSP;
    expect(vm.PSP).toEqual((vm.END_ADDRESS - 1),
      "Expected stack to have 1 item after STORE operation.");
    expect(vm.buffer[vm.PSP + 1]).toEqual(13);
  });

  it("has CALL and RETURN instruction", () => {
    // Testing in isolation is not enough.
    // It takes two flints to make a fire.
    // So too must the CALL and RETURN instructions coexist.
    //
    // - Julius Caesar
    let vm = run(`
      push
      6
      call
      drop
      noop
      noop
      push
      5
      return
    `);
    expect(vm.RSP).toBe(55,
    "In a 64 word VM, RSP should start at address 55.");
    vm.tick(); // PUSH 6
    vm.tick(); // CALL
    expect(vm.IP).toBe(6,
    "executing 'PUSH 6 CALL' should set IP to 6 in one tick.");
    expect(vm.PSP).toBe(63,
    "Executing 'CALL' Should decrement the stack from 62 to 63.");
    expect(vm.buffer[vm.RSP + 1]).toBe(3,
    "Executing 'CALL' should store next IP address into return stack before jumping into subroutine.");
    expect(vm.RSP).toBe(54,
    "CALLing an address should grow RSP by 1.");
    vm.tick();
    expect(vm.buffer[vm.PSP + 1]).toBe(5,
    "Expected to be on the stack after calling a subroutine that pushes 5 on stack.");
    vm.tick();
    expect(vm.IP).toBe(3,
    "RETURN should take IP back to (starting_address + 1) ");
    expect(vm.RSP).toBe(55,
    "RETURNing should shrink RSP by 1.");
  });

  it('branches when IF is given 0', function() {
     
    let vm = run(`  if
                    0
                    5
                    push
                    66
                    push
                    99 `);
    vm.tick();
    expect(vm.IP).toBe(5,
      "IF instruction should jump IP to address if value is 0.");
    vm.tick();
    expect(vm.buffer[vm.PSP + 1]).toBe(99,
      "Expected the IF statement to branch to PUSH 99.");
  });

  it("does not branch when condition != 0", function() {
    let vm = run(`  if
                    1
                    5
                    push
                    66
                    push
                    99 `);
    vm.tick();
    expect(vm.IP).toBe(3,
      "IF instruction should jump to next instruction if condition is not 0.");
    vm.tick();
    expect(vm.buffer[vm.PSP + 1]).toBe(66,
      "Expected the IF statement to branch to PUSH 66.");
  });

  it("ADDs two numbers", function() {
    let vm = run(`
    push
    2
    push
    3
    add
    noop
    `);
    vm.tick();
    vm.tick();
    dump(vm);
    vm.tick();
    dump(vm);
    expect(vm.IP).toBe(5,
      "Expected add to increment instruction pointer by 1.");
    expect(vm.buffer[vm.PSP + 1]).toBe(5,
    "Expect (2 3 ADD) to leave 5 on the stack.");
  })

})
