import { InstructionSet } from "./instruction_set";
/** A slice of bits representing the VM memory. */
export declare class VM {
    /** Memory size limit */ SIZE: number;
    /** The default instructions that come with a dtandard VM.
     *  Can be patched or extended.
     */
    static INSTRUCTIONS: InstructionSet;
    /** Raw JS memory buffer. Avoid direct modification. */
    buffer: Uint16Array;
    /** Default size of the memory buffer, in words */
    static DEFAULT_SIZE: number;
    /** First memory address that can be used for applications. */
    START_ADDRESS: number;
    /** Last cell of memory. */
    END_ADDRESS: number;
    /** Instruction Pointer. Points to next memory address to be executed */
    IP: number;
    /** Pointer to top of parameter stack. */
    PSP: number;
    /** Pointer to top of return stack. */
    RSP: number;
    constructor(/** Memory size limit */ SIZE?: number);
    /** Run one execution cycle */
    tick(): void;
    /** Completely reset the VM, including loaded programs. */
    reset(): void;
    /** Load a program into memory */
    load(program: number[]): void;
}
