"use strict";
var instruction_set_1 = require("./instruction_set");
var default_instructions_1 = require("./default_instructions");
/** A slice of bits representing the VM memory. */
var VM = (function () {
    function VM(/** Memory size limit */ SIZE) {
        if (SIZE === void 0) { SIZE = VM.DEFAULT_SIZE; }
        this.SIZE = SIZE;
        /** First memory address that can be used for applications. */
        this.START_ADDRESS = 0;
        if (SIZE < 64) {
            throw new Error("The VM requires atleast 64 words of memory.");
        }
        this.reset();
    }
    /** Run one execution cycle */
    VM.prototype.tick = function () {
        var opCode = this.buffer[this.IP];
        var mnemonic = VM.INSTRUCTIONS.fetchMnemonic(opCode);
        // console.log(`Executing ${mnemonic} (${ opCode }) at address ${ this.IP }`);
        VM.INSTRUCTIONS.exec(opCode, this);
    };
    /** Completely reset the VM, including loaded programs. */
    VM.prototype.reset = function () {
        this.END_ADDRESS = this.SIZE - 1;
        this.PSP = this.END_ADDRESS;
        this.RSP = this.END_ADDRESS - 8; // TODO set "STACK SIZE" constant.
        this.IP = this.START_ADDRESS;
        this.buffer = new Uint16Array(this.SIZE);
        this.buffer.fill(0);
    };
    ;
    /** Load a program into memory */
    VM.prototype.load = function (program) {
        var that = this;
        that.reset();
        program.forEach(function (instruction, index) {
            that.buffer[index + that.START_ADDRESS] = instruction;
        });
    };
    /** The default instructions that come with a dtandard VM.
     *  Can be patched or extended.
     */
    VM.INSTRUCTIONS = new instruction_set_1.InstructionSet()
        .add("NOOP", default_instructions_1.DefaultInstructions.NOOP)
        .add("PUSH", default_instructions_1.DefaultInstructions.PUSH)
        .add("STORE", default_instructions_1.DefaultInstructions.STORE)
        .add("FETCH", default_instructions_1.DefaultInstructions.FETCH)
        .add("CALL", default_instructions_1.DefaultInstructions.CALL)
        .add("RETURN", default_instructions_1.DefaultInstructions.RETURN)
        .add("IF", default_instructions_1.DefaultInstructions.IF)
        .add("ADD", default_instructions_1.DefaultInstructions.ADD)
        .add("SUB", default_instructions_1.DefaultInstructions.SUB)
        .add("OR", default_instructions_1.DefaultInstructions.OR)
        .add("XOR", default_instructions_1.DefaultInstructions.XOR)
        .add("AND", default_instructions_1.DefaultInstructions.AND)
        .add("DROP", default_instructions_1.DefaultInstructions.DROP)
        .add("DUP", default_instructions_1.DefaultInstructions.DUP)
        .add("OVER", default_instructions_1.DefaultInstructions.OVER)
        .add("SWAP", default_instructions_1.DefaultInstructions.SWAP)
        .add("RPUSH", default_instructions_1.DefaultInstructions.RPUSH)
        .add("RDROP", default_instructions_1.DefaultInstructions.RDROP);
    /** Default size of the memory buffer, in words */
    VM.DEFAULT_SIZE = 256;
    return VM;
}());
exports.VM = VM;
