import { VM } from "./vm";
/** A single primitive instruction. */
export declare class Instruction {
    /** Numeric code that the VM uses to id the instruction */
    opCode: number;
    /** Implementation of the instruction. Directly acts on VM. */
    fn: InstructionFn;
    /** Human readable mnemonic. Eg: PUSH, POP, ADD */
    name: string;
    constructor(
        /** Numeric code that the VM uses to id the instruction */
        opCode: number, name: string, 
        /** Implementation of the instruction. Directly acts on VM. */
        fn: InstructionFn);
    /** Execute the current instruction against a VM object. */
    call(vm: VM): void;
}
export declare type InstructionFn = (vm: VM) => any;
