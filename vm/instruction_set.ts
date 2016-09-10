import { VM } from "./vm";
import { Instruction, InstructionFn } from "./instruction";

// WORKS CITED:
//   https://users.ece.cmu.edu/~koopman/stack_computers/sec3_2.html

/** A singleton representing all instructions for the architecture. */
export class InstructionSet {

  /** All instructions, indexed by opcode */
  public all: Instruction[];

  /** All instructions, indexed by name */
  public lookup: {[name: string]: Instruction};

  constructor() {
    this.all = [];
    this.lookup = {};
    this.add("BAD_OPCODE", function BAD_OPCODE(vm: VM) {
      throw new Error("BAD OPCODE. ABORTING EXECUTION.");
    });
  }

  exec(opcode: number, vm: VM) {
    let instruction = this.all[opcode] || this.lookup["BAD_OPCODE"];
    instruction.call(vm);
  }

  add(name: string, fn: InstructionFn) {
    let i = new Instruction(this.all.length, name, fn);
    this.all.push(i);
    this.lookup[i.name] = i;
    return this;
  }

  fetchOpcode(name: string) {
    let i = this.lookup[name];
    if(i) {
      return i.opCode;
    } else {
      throw new Error("Can't find opcode with name " + name);
    }
  }
}

// TODO: COnvert to dict. obj w/ number keys for readability.
export let instructions = new InstructionSet()
  .add("NOOP", NOOP)
  .add("PUSH", NOOP)
  .add("STORE", NOOP)
  .add("FETCH", NOOP)
  .add("CALL", NOOP)
  .add("RETURN", NOOP)
  .add("IF", NOOP)
  .add("ADD", NOOP)
  .add("SUB", NOOP)
  .add("OR", NOOP)
  .add("XOR", NOOP)
  .add("AND", NOOP)
  .add("DROP", NOOP)
  .add("DUP", NOOP)
  .add("OVER", NOOP)
  .add("SWAP", NOOP)
  .add("RPUSH", NOOP)
  .add("RPOP", NOOP); // Add JMP? Just use IF? Hmmm...


function NOOP(vm: VM) {
  console.log("I am a noop!");
}