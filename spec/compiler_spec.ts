/// <reference path="../typings/index.d.ts" />

import { Compiler } from "../compiler";
import { VM } from "../vm";

describe("Compiler", function() {
  let compile = Compiler();

  it("turns text into an array of instruction opcodes", function() {
    let program = compile(`
    PUSH 123
    noOp
    `);
    expect(program).toEqual([
      VM.INSTRUCTIONS.fetchOpcode("push"),
      123,
      VM.INSTRUCTIONS.fetchOpcode("noop")
    ]);
  });

})
