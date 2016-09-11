/// <reference path="../typings/index.d.ts" />

import { Compiler } from "../compiler";
import { instructions } from "../instruction_set";

describe("Compiler", function() {
  let compile = Compiler(instructions);

  it("turns text into an array of instruction opcodes", function() {
    let program = compile(`
    PUSH 123
    noOp
    `);
    expect(program).toEqual([
      instructions.fetchOpcode("push"),
      123,
      instructions.fetchOpcode("noop")
    ]);
  });

})
