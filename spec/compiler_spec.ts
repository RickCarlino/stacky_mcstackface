/// <reference path="../typings/index.d.ts" />

import { Compiler } from "../compiler";
import { defaultIntstructionSet } from "../instruction_set";

describe("Compiler", function() {
  let compile = Compiler(defaultIntstructionSet);

  it("turns text into an array of instruction opcodes", function() {
    let program = compile(`
    PUSH 123
    noOp
    `);
    expect(program).toEqual([
      defaultIntstructionSet.fetchOpcode("push"),
      123,
      defaultIntstructionSet.fetchOpcode("noop")
    ]);
  });

})
