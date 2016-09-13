import { VM } from "../vm";
import { Compiler } from "../compiler";

let compile = Compiler();


export function run(code: string, vm: VM = new VM()): VM {
    let program = compile(code);
    vm.load(program);
    return vm;
}

export function inspectLast(x: number, vm: VM) {
    console.log(vm.buffer.slice(Math.max(vm.buffer.length - x, 1)));
}