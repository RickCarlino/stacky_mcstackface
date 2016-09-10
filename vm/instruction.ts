import { VM } from "./vm";

export class Instruction {
  constructor(public opCode: number,
    public name: string,
    public fn: InstructionFn) {

  }

  call(vm: VM) {
    console.log("Calling " + this.name)
    this.fn(vm);
  }
}

export type InstructionFn = (vm: VM) => any;
