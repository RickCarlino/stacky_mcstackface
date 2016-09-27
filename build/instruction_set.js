"use strict";
var instruction_1 = require("./instruction");
var default_instructions_1 = require("./default_instructions");
// WORKS CITED:
//   https://users.ece.cmu.edu/~koopman/stack_computers/sec3_2.html
/** A singleton representing all instructions for the architecture. */
var InstructionSet = (function () {
    function InstructionSet() {
        this.all = [];
        this.lookup = {};
        this.add("BAD_OPCODE", function BAD_OPCODE(vm) {
            throw new Error("BAD OPCODE. ABORTING EXECUTION.");
        });
    }
    /** Execute a numeric op code against a VM's memory. */
    InstructionSet.prototype.exec = function (opcode, vm) {
        var instruction = this.all[opcode] || this.lookup["BAD_OPCODE"];
        instruction.call(vm);
    };
    /** Add a new instruction to the current instruction set. */
    InstructionSet.prototype.add = function (name, fn) {
        var i = new instruction_1.Instruction(this.all.length, name, fn);
        this.all.push(i);
        this.lookup[i.name] = i;
        return this;
    };
    /** Find a pneumonic by number */
    InstructionSet.prototype.fetchPneumonic = function (opCode) {
        var i = this.all[opCode];
        if (i) {
            return i.name;
        }
        else {
            throw new Error("Can't find pneumonic with op code " + opCode);
        }
    };
    /** Find an instruction by name. */
    InstructionSet.prototype.fetchOpcode = function (name) {
        var i = this.lookup[name.toUpperCase()];
        if (i) {
            return i.opCode;
        }
        else {
            throw new Error("Can't find opcode with name " + name);
        }
    };
    return InstructionSet;
}());
exports.InstructionSet = InstructionSet;
/** The default set of instructions. */
exports.defaultIntstructionSet = new InstructionSet()
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
