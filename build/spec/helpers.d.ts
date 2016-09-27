import { VM } from "../vm";
export declare function run(code: string, vm?: VM): VM;
export declare function dump(vm: VM): void;
export declare function inspectFirst(x: number, vm: VM): void;
