import { InstructionSet } from "./instruction_set";

// TODO: Add support for labels when jumping.
export let Compiler = (i: InstructionSet) =>
  (input: string): number[] => {
    return input
      .split(/\s+/)
      .filter(w => w !== "")
      .map((token: string): number => {
        let num = parseInt(token);
        let isNumber = !isNaN(num);
        if (isNumber) {
          // TODO : Validate that number does not cause an overflow.
          return num;
        } else {
          return i.fetchOpcode(token.toUpperCase())
        }
      })
  }