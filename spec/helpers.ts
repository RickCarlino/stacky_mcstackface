import { VM } from "../vm";
import { Compiler } from "../compiler";

let compile = Compiler();


export function run(code: string, vm: VM = new VM(64)): VM {
    let program = compile(code);
    vm.load(program);
    return vm;
}

export function dump(vm: VM) {
    let ret: string[] = [];
    let line = "---------------------------------\n";
    let str = `IP: ${vm.IP} / PSP: ${vm.PSP} / RSP: ${vm.RSP}\n` + line;
    [
        [0, 8],
        [8, 16],
        [16, 24],
        [24, 32],
        [32, 40],
        [40, 48],
        [48, 56],
        [56, 64]
    ].forEach(function (slice) {
        let [start, end] = slice;
        let row: string[] = [];
        vm
          .buffer
          .slice(start, end)
          .forEach(function(i) { row.push(("___" + i).slice(-3)) });
        str += ("|" + row.join("|") + "|\n");
    });
    console.log(str);
}

export function inspectFirst(x: number, vm: VM) {
    console.log(vm.buffer.slice(0, x));
}