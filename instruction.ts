import { VM } from "./vm";

/** A single primitive instruction. */
export class Instruction {
  /** Human readable pneumonic. Eg: PUSH, POP, ADD */
  public name: string;

  constructor(
    /** Numeric code that the VM uses to id the instruction */
    public opCode: number,
    name: string,
    /** Implementation of the instruction. Directly acts on VM. */
    public fn: InstructionFn) {
    this.name = name.toUpperCase();
  }

  /** Execute the current instruction against a VM object. */
  call(vm: VM) {
    this.fn(vm);
  }
}

export type InstructionFn = (vm: VM) => any;
