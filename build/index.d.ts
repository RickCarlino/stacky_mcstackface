import * as defins1 from "./default_instructions";
import * as ins1 from "./instruction";
import * as ins_set1 from "./instruction_set";
import * as VM1 from "./vm";
export declare let Compiler: (i?: ins_set1.InstructionSet) => (input: string) => number[];
export declare let DefaultInstructions: typeof defins1.DefaultInstructions;
export declare let Instruction: typeof ins1.Instruction;
export declare let InstructionSet: typeof ins_set1.InstructionSet;
export declare let VM: typeof VM1.VM;
