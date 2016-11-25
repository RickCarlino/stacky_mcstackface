"use strict";
/** The standard set of instructions that come with the VM. */
var DefaultInstructions;
(function (DefaultInstructions) {
    /** Increment IP by 1 (no operation).
     * ( -- )
     */
    function NOOP(vm) { return vm.buffer[++vm.IP]; }
    DefaultInstructions.NOOP = NOOP;
    /** Pushes memory address after IP onto parameter stack.
     * ( -- )
     */
    function PUSH(vm) {
        vm.buffer[vm.PSP] = NOOP(vm);
        vm.PSP--;
        NOOP(vm);
    }
    DefaultInstructions.PUSH = PUSH;
    /** Stores n2 into memory address listed in n1(value, addr -- ) */
    function STORE(vm) {
        var addr = DROP(vm);
        var val = DROP(vm);
        if (vm.buffer[addr] !== undefined) {
            vm.buffer[addr] = val;
        }
        else {
            throw new Error("Memory address " + addr + " out of range (only " + vm.buffer.length + " words)");
        }
        NOOP(vm); // Move IP ontop of literal value
    }
    DefaultInstructions.STORE = STORE;
    /** Places contents of arbitrary memory address onto top of stack
     * ( addr -- addr contents )
    */
    function FETCH(vm) {
        // Possible off by one???
        // Pop memory address from top of stack.
        var addr = DROP(vm);
        var val = vm.buffer[addr];
        vm.buffer[vm.PSP] = val;
        vm.PSP--;
        NOOP(vm);
    }
    DefaultInstructions.FETCH = FETCH;
    /** Pushes current IP onto return stack and jumps into memory address as
     * top of stack
     */
    function CALL(vm) {
        vm.buffer[vm.RSP] = vm.IP + 1;
        vm.RSP--;
        vm.IP = DROP(vm);
    }
    DefaultInstructions.CALL = CALL;
    /** Pops top of return stack and sets IP to that address. */
    function RETURN(vm) { vm.IP = RDROP(vm); }
    DefaultInstructions.RETURN = RETURN;
    /** Jumps to adress n2 if n1 is 0. */
    function IF(vm) {
        // If N1 is false (value is 0)
        var n1 = DROP(vm);
        if (n1 === 0) {
            vm.IP = NOOP(vm);
        }
        else {
            vm.IP += 2;
        }
        ;
    }
    DefaultInstructions.IF = IF;
    /** Puts n2 + n1 on top of stack. */
    function ADD(vm) {
        vm.buffer[vm.PSP + 2] = DROP(vm) + DROP(vm);
        vm.IP++;
        vm.PSP--;
    }
    DefaultInstructions.ADD = ADD;
    /** Puts n2 - n1 on top of stack. */
    function SUB(vm) {
        var a = DROP(vm);
        var b = DROP(vm);
        vm.buffer[vm.PSP] = b - a;
        vm.IP++;
        vm.PSP--;
    }
    DefaultInstructions.SUB = SUB;
    /** Bitwise OR of n1 and n2 */
    function OR(vm) {
        var a = DROP(vm);
        var b = DROP(vm);
        vm.buffer[vm.PSP] = b | a;
        vm.IP++;
        vm.PSP--;
    }
    DefaultInstructions.OR = OR;
    /** Exclusive OR of n1 and n2 */
    function XOR(vm) {
        var a = DROP(vm);
        var b = DROP(vm);
        vm.buffer[vm.PSP] = b ^ a;
        vm.IP++;
        vm.PSP--;
    }
    DefaultInstructions.XOR = XOR;
    function AND(vm) {
        var a = DROP(vm);
        var b = DROP(vm);
        vm.buffer[vm.PSP] = b & a;
        vm.IP++;
        vm.PSP--;
    }
    DefaultInstructions.AND = AND;
    function DROP(vm) {
        if (vm.PSP >= (vm.buffer.length - 1)) {
            throw new Error("Stack underflow.");
        }
        vm.PSP++;
        var val = vm.buffer[vm.PSP];
        vm.buffer[vm.PSP] = 0; // This is for ease of debugging. Not required.
        return val;
    }
    DefaultInstructions.DROP = DROP;
    function DUP(vm) {
        vm.buffer[vm.PSP] = vm.buffer[vm.PSP + 1];
        vm.PSP--;
        vm.IP++;
    }
    DefaultInstructions.DUP = DUP;
    function RDROP(vm) {
        vm.RSP++;
        var val = vm.buffer[vm.RSP];
        vm.buffer[vm.RSP] = 0; // This is for ease of debugging. Not required.
        return val;
    }
    DefaultInstructions.RDROP = RDROP;
    function SWAP(vm) {
        var over = vm.buffer[vm.PSP + 1];
        var undr = vm.buffer[vm.PSP + 2];
        vm.buffer[vm.PSP + 1] = undr;
        vm.buffer[vm.PSP + 2] = over;
        vm.IP++;
    }
    DefaultInstructions.SWAP = SWAP;
    function OVER(vm) {
        vm.buffer[vm.PSP] = vm.buffer[vm.PSP + 2];
        vm.PSP--;
        vm.IP++;
    }
    DefaultInstructions.OVER = OVER;
    function RPUSH(vm) {
        vm.buffer[vm.RSP] = vm.buffer[vm.IP + 1];
        vm.RSP--;
        vm.IP++;
        vm.IP++;
    }
    DefaultInstructions.RPUSH = RPUSH;
})(DefaultInstructions = exports.DefaultInstructions || (exports.DefaultInstructions = {}));
