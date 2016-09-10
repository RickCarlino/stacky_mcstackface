
import { Memory } from "./memory";

/** Calls the outter interpreter to execute a block of FORTH code. */
function outerInterpreter(input: string, memory: Memory) {
    // http://galileo.phys.virginia.edu/classes/551.jvn.fall01/frth_int.gif
    function isWord(text: string) { }
    function isImmediate() { }
    function isNumber(text: string) { }
    function execute(text: string) { }
    function compile() { }
    function numberOnStack(word: string) { }
    function sayOK() { }

    function interpret(word: string) {
      (isWord(word) ? execute : numberOnStack)(word);
    }
  // Empty the return stack,
  memory.resetRSP();
  // accept new input from the current input device,
  // begin text interpretation.
}
