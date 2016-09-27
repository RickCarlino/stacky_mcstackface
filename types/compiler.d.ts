import { InstructionSet } from "./instruction_set";
/** Generate a compiler function that can convert text chunks into arrays of
 * op codes. */
export declare let Compiler: (i?: InstructionSet) => (input: string) => number[];
