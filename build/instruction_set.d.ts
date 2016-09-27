import { VM } from "./vm";
import { InstructionFn } from "./instruction";
/** A singleton representing all instructions for the architecture. */
export declare class InstructionSet {
    /** All instructions, indexed by opcode */
    private all;
    /** All instructions, indexed by name */
    private lookup;
    constructor();
    /** Execute a numeric op code against a VM's memory. */
    exec(opcode: number, vm: VM): void;
    /** Add a new instruction to the current instruction set. */
    add(name: string, fn: InstructionFn): this;
    /** Find a pneumonic by number */
    fetchPneumonic(opCode: number): string;
    /** Find an instruction by name. */
    fetchOpcode(name: string): number;
}
/** The default set of instructions. */
export declare let defaultIntstructionSet: InstructionSet;
