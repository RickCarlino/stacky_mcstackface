// Just playing with the idea of a VM
"use strict";
function BAD_OPCODE(vm) {
    throw new Error("BAD OPCODE. ABORTING EXECUTION.");
}
// TODO: COnvert to dict. obj w/ number keys for readability.
var instructions = [
    BAD_OPCODE,
    function NOOP(vm) { },
    function PUSH(vm) {
        // grab current byte being pointed to.
        var value = vm.buffer[vm.IP];
        // skip to next instruction, since that byte is a value, not an op code.
        vm.IP++;
        // grow stack by one.
        vm.PSP--;
        // put value on top of stack
        vm[vm.PSP] = value;
    },
    function CALL(vm) { },
    function JUMP(vm) { },
];
/** A slice of bits representing the FORTH memory area. */
var VM = (function () {
    function VM(/** Memory size limit */ SIZE) {
        if (SIZE === void 0) { SIZE = 4096; }
        this.SIZE = SIZE;
        /** First memory address that can be used for applications. */
        this.START_ADDRESS = 0;
    }
    VM.prototype.tick = function () {
        var nextOpCode = this.buffer[this.IP];
        this.IP++;
        var nextInstruction = instructions[nextOpCode] || BAD_OPCODE;
        nextInstruction(this);
    };
    VM.prototype.reset = function () {
        this.END_ADDRESS = this.SIZE - 1;
        this.TOS = this.END_ADDRESS;
        this.buffer = new Uint8Array(this.SIZE);
        this.buffer.fill(0);
        this.IP = this.START_ADDRESS;
        this.TOS = this.buffer.length;
    };
    ;
    return VM;
}());
exports.VM = VM;
