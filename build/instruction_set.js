"use strict";
var instruction_1 = require("./instruction");
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
