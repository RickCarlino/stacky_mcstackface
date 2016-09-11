import { InstructionSet } from "./instruction_set";

/** Converts a block of text into a cleaned array of tokens. */
function tokenize(input: string): string[] {
  return input
    // Split tokens on "\n" or " ".
    .split(/\s+/)
    // Remove empty tokens.
    .filter(w => w !== "");
}

/** Turns an array of tokens into a list of op codes. */
function parse(tokens: string[], instructionSet: InstructionSet): number[] {
  return tokens.map((token: string): number => {
    let num = parseInt(token);
    let isNumber = !isNaN(num);
    if (isNumber) {
      // TODO : Validate that number does not cause an overflow.
      return num;
    } else {
      return instructionSet.fetchOpcode(token.toUpperCase())
    }
  })
}

// TODO: Add support for labels when jumping.
/** Generate a compiler function that can convert text chunks into arrays of
 * op codes. */
export let Compiler = (i: InstructionSet) =>
  (input: string): number[] => {
    let tokens = tokenize(input);
    let program = parse(tokens, i);
    return program;
  }