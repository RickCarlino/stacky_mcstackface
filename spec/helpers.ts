import { VM } from "../vm";
import { Compiler } from "../compiler";

let compile = Compiler();


export function run(code: string, vm: VM = new VM()): VM {
    let program = compile(code);
    vm.load(program);
    return vm;
}