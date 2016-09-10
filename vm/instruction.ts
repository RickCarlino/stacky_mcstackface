import { VM } from "./vm";

export class Instruction {
  public name: string;

  constructor(public opCode: number, name: string,
    public fn: InstructionFn) {
    this.name = name.toUpperCase();
  }

  call(vm: VM) {
    console.log("Calling " + this.name)
    this.fn(vm);
  }
}

export type InstructionFn = (vm: VM) => any;
