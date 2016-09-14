import { VM } from "../vm";
import { Compiler } from "../compiler";

let compile = Compiler();


export function run(code: string, vm: VM = new VM(25)): VM {
    let program = compile(code);
    vm.load(program);
    return vm;
}

export function inspectLast(x: number, vm: VM) {
    let subArr = vm.buffer.slice(Math.max(vm.buffer.length - x, 1));
    let ret: string[] = [];

    subArr.forEach(function(i) {
        let str = ("   " + i).slice(-3);
        ret.push(str)
    })
    console.log(ret.join("|"));
}

export function inspectFirst(x: number, vm: VM) {
    console.log(vm.buffer.slice(0, x));
}