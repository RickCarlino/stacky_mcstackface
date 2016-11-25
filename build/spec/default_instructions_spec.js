/// <reference path="../typings/index.d.ts" />
"use strict";
var helpers_1 = require("./helpers");
describe("Default instructions", function () {
    it("has CALL and RETURN instruction", function () {
        // Testing in isolation is not enough.
        // It takes two flints to make a fire.
        // So too must the CALL and RETURN instructions coexist.
        //
        // - Julius Caesar
        var vm = helpers_1.run("\n      push\n      6\n      call\n      drop\n      noop\n      noop\n      push\n      5\n      return\n    ");
        expect(vm.RSP).toBe(55, "In a 64 word VM, RSP should start at address 55.");
        vm.tick(); // PUSH 6
        vm.tick(); // CALL
        expect(vm.IP).toBe(6, "executing 'PUSH 6 CALL' should set IP to 6 in one tick.");
        expect(vm.PSP).toBe(63, "Executing 'CALL' Should decrement the stack from 62 to 63.");
        expect(vm.buffer[vm.RSP + 1]).toBe(3, "Executing 'CALL' should store next IP address into return stack before jumping into subroutine.");
        expect(vm.RSP).toBe(54, "CALLing an address should grow RSP by 1.");
        vm.tick();
        expect(vm.buffer[vm.PSP + 1]).toBe(5, "Expected to be on the stack after calling a subroutine that pushes 5 on stack.");
        vm.tick();
        expect(vm.IP).toBe(3, "RETURN should take IP back to (starting_address + 1) ");
        expect(vm.RSP).toBe(55, "RETURNing should shrink RSP by 1.");
    });
    it('branches when IF is given 0', function () {
        var vm = helpers_1.run("\n      push 0\n      if 6\n      push 66\n      push 99\n    ");
        vm.tick();
        vm.tick();
        expect(vm.IP).toBe(6, "IF instruction should jump to address if stack holds 0.");
        vm.tick();
        expect(vm.buffer[vm.PSP + 1]).toBe(99, "Expected the IF statement to branch to PUSH 99, NOT 66.");
    });
    it("does not branch when condition != 0", function () {
        var vm = helpers_1.run("\n      push 1\n      if 4\n      push 66\n      push 99\n    ");
        vm.tick();
        vm.tick();
        expect(vm.IP).toBe(4, "IF instruction should jump to next instruction if condition is not 0.");
        vm.tick();
        expect(vm.buffer[vm.PSP + 1]).toBe(66, "Expected the IF statement to branch to PUSH 66.");
    });
    it("has a NOOP instruction", function () {
        var vm = helpers_1.run("nooP Noop NOOP");
        var startIP = vm.IP;
        vm.tick();
        vm.tick();
        vm.tick();
        var endIP = vm.IP;
        expect(endIP).toEqual(startIP + 3, "A NOOP instruction should increment the instruction pointer each time it is called.");
        expect(vm.PSP).toEqual(vm.END_ADDRESS, "The NOOP instruction has no stack effect.");
    });
    it("has a PUSH instruction", function () {
        var vm = helpers_1.run("PUSH 1 pUsH 2 PUsh 3");
        vm.tick();
        vm.tick();
        vm.tick();
        expect(vm.END_ADDRESS).toBeGreaterThan(vm.PSP);
        expect(vm.PSP).toEqual(vm.END_ADDRESS - 3);
        expect(vm.buffer[vm.END_ADDRESS]).toEqual(1, "I pushed 1 onto the stack. Therefore, I expected one to be the element at the bottom of the stack.");
        expect(vm.buffer[vm.PSP]).toEqual(0, "Stack pointer should point to the next available stack slot.");
        expect(vm.buffer[vm.PSP + 1]).toEqual(3, "Expected last PUSHed value to be one address under stack pointer.");
    });
    it("has an OVER instruction", function () {
        var vm = helpers_1.run("\n    push\n    3\n    push\n    6\n    over\n    ");
        var start = vm.PSP;
        vm.tick();
        vm.tick();
        vm.tick();
        var end = vm.PSP;
        expect(vm.PSP).toBe(60);
        expect(vm.IP).toBe(5, "Expected to increment instruction pointer by 1.");
        expect(vm.buffer[vm.PSP + 3]).toBe(3);
        expect(vm.buffer[vm.PSP + 2]).toBe(6);
        expect(vm.buffer[vm.PSP + 1]).toBe(3);
    });
    it("has an RPUSH instruction", function () {
        var vm = helpers_1.run("\n    rpush\n    3\n    ");
        vm.tick();
        expect(vm.PSP).toBe(63, "Expected parameter stack to be empty.");
        expect(vm.RSP).toBe(54, "Expected one item in return stack.");
        expect(vm.IP).toBe(2, "Expected RPUSH to increment instruction pointer.");
        expect(vm.buffer[vm.RSP + 1]).toBe(3);
    });
    it("has a STORE instruction", function () {
        var vm = helpers_1.run("\n    push 34\n    push 12\n    store\n    ");
        var startIP = vm.IP;
        var startPSP = vm.PSP;
        vm.tick();
        vm.tick();
        vm.tick();
        var endIP = vm.IP;
        var endPSP = vm.PSP;
        expect(startPSP).toEqual(vm.END_ADDRESS);
        expect(endIP).toEqual((startIP + 5), "Push increments the stack 2x. Store 1x. Push + push + store = 5 IP incrementations.");
        expect(vm.PSP).toEqual(vm.END_ADDRESS, "The STORE instruction should clear the last two stack items.");
        expect(vm.buffer[12]).toEqual(34);
    });
    it("has a FETCH instruction", function () {
        var vm = helpers_1.run("\n    push 13\n    push 8\n    store\n    push 8\n    fetch\n    ");
        var startIP = vm.IP;
        var startPSP = vm.PSP;
        vm.tick();
        vm.tick();
        vm.tick();
        vm.tick();
        vm.tick();
        var endIP = vm.IP;
        var endPSP = vm.PSP;
        expect(vm.PSP).toEqual((vm.END_ADDRESS - 1), "Expected stack to have 1 item after STORE operation.");
        expect(vm.buffer[vm.PSP + 1]).toEqual(13);
    });
    it("has a DUP instruction", function () {
        var vm = helpers_1.run("\n    push 8\n    dup\n    ");
        var startIP = vm.IP;
        var startPSP = vm.PSP;
        vm.tick();
        vm.tick();
        var endIP = vm.IP;
        var endPSP = vm.PSP;
        expect(vm.PSP).toEqual((vm.END_ADDRESS - 2), "Expected stack to have 2 items after DUP operation.");
        expect(vm.buffer[vm.PSP + 1]).toEqual(8);
        expect(vm.buffer[vm.PSP + 2]).toEqual(8);
    });
    it("ADDs two numbers", function () {
        var vm = helpers_1.run("\n    push\n    2\n    push\n    3\n    add\n    noop\n    ");
        vm.tick();
        vm.tick();
        vm.tick();
        expect(vm.IP).toBe(5, "Expected to increment instruction pointer by 1.");
        expect(vm.buffer[vm.PSP + 1]).toBe(5, "Expect (2 3 ADD) to leave 5 on the stack.");
    });
    it("SUBs two numbers", function () {
        var vm = helpers_1.run("\n    push\n    9\n    push\n    2\n    sub\n    ");
        vm.tick();
        vm.tick();
        vm.tick();
        expect(vm.IP).toBe(5, "Expected to increment instruction pointer by 1.");
        expect(vm.buffer[vm.PSP + 1]).toBe(7, "Expect (3 2 SUB) to leave 1 on the stack.");
    });
    it("ORs two numbers", function () {
        var vm = helpers_1.run("\n    push\n    9\n    push\n    2\n    or\n    ");
        vm.tick();
        vm.tick();
        vm.tick();
        expect(vm.IP).toBe(5, "Expected to increment instruction pointer by 1.");
        expect(vm.buffer[vm.PSP + 1]).toBe(11, "Expect (9 2 OR) to leave 1 on the stack.");
    });
    it("XORs two numbers", function () {
        var vm = helpers_1.run("\n    push\n    9\n    push\n    2\n    xor\n    ");
        vm.tick();
        vm.tick();
        vm.tick();
        expect(vm.IP).toBe(5, "Expected to increment instruction pointer by 1.");
        expect(vm.buffer[vm.PSP + 1]).toBe(11, "Expect (9 2 XOR) to leave 1 on the stack.");
    });
    it("ANDs two numbers", function () {
        var vm = helpers_1.run("\n    push\n    3\n    push\n    11\n    and\n    ");
        vm.tick();
        vm.tick();
        vm.tick();
        expect(vm.IP).toBe(5, "Expected to increment instruction pointer by 1.");
        expect(vm.buffer[vm.PSP + 1]).toBe(3, "Expect (3 11 AND) to leave 1 on the stack.");
    });
    it("SWAPs two numbers", function () {
        var vm = helpers_1.run("\n    push\n    3\n    push\n    11\n    swap\n    ");
        vm.tick();
        vm.tick();
        vm.tick();
        expect(vm.IP).toBe(5, "Expected to increment instruction pointer by 1.");
        expect(vm.buffer[vm.PSP + 2]).toBe(11);
        expect(vm.buffer[vm.PSP + 1]).toBe(3);
    });
});
