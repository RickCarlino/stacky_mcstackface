"use strict";
/** A single primitive instruction. */
var Instruction = (function () {
    function Instruction(
        /** Numeric code that the VM uses to id the instruction */
        opCode, name, 
        /** Implementation of the instruction. Directly acts on VM. */
        fn) {
        this.opCode = opCode;
        this.fn = fn;
        this.name = name.toUpperCase();
    }
    /** Execute the current instruction against a VM object. */
    Instruction.prototype.call = function (vm) {
        this.fn(vm);
    };
    return Instruction;
}());
exports.Instruction = Instruction;
