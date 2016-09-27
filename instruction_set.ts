import { VM } from "./vm";
import { Instruction, InstructionFn } from "./instruction";
import { DefaultInstructions } from "./default_instructions";

// WORKS CITED:
//   https://users.ece.cmu.edu/~koopman/stack_computers/sec3_2.html

/** A singleton representing all instructions for the architecture. */
export class InstructionSet {

  /** All instructions, indexed by opcode */
  private all: Instruction[];

  /** All instructions, indexed by name */
  private lookup: {[name: string]: Instruction};

  constructor() {
    this.all = [];
    this.lookup = {};
    this.add("BAD_OPCODE", function BAD_OPCODE(vm: VM) {
      throw new Error("BAD OPCODE. ABORTING EXECUTION.");
    });
  }

  /** Execute a numeric op code against a VM's memory. */
  exec(opcode: number, vm: VM) {
    let instruction = this.all[opcode] || this.lookup["BAD_OPCODE"];
    instruction.call(vm);
  }

  /** Add a new instruction to the current instruction set. */
  add(name: string, fn: InstructionFn) {
    let i = new Instruction(this.all.length, name, fn);
    this.all.push(i);
    this.lookup[i.name] = i;
    return this;
  }

  /** Find a pneumonic by number */
  fetchPneumonic(opCode: number) {
    let i = this.all[opCode];
    if(i) {
      return i.name;
    } else {
      throw new Error("Can't find pneumonic with op code " + opCode);
    }
  }

  /** Find an instruction by name. */
  fetchOpcode(name: string) {
    let i = this.lookup[name.toUpperCase()];
    if(i) {
      return i.opCode;
    } else {
      throw new Error("Can't find opcode with name " + name);
    }
  }
}
