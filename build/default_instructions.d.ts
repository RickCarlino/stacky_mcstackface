import { VM } from "./vm";
/** The standard set of instructions that come with the VM. */
export declare namespace DefaultInstructions {
    /** Increment IP by 1 (no operation).
     * ( -- )
     */
    function NOOP(vm: VM): number;
    /** Pushes memory address after IP onto parameter stack.
     * ( -- )
     */
    function PUSH(vm: VM): void;
    /** Stores n2 into memory address listed in n1(value, addr -- ) */
    function STORE(vm: VM): void;
    /** Places contents of arbitrary memory address onto top of stack
     * ( addr -- addr contents )
    */
    function FETCH(vm: VM): void;
    /** Pushes current IP onto return stack and jumps into memory address as
     * top of stack
     */
    function CALL(vm: VM): void;
    /** Pops top of return stack and sets IP to that address. */
    function RETURN(vm: VM): void;
    /** Jumps to adress n2 if n1 is 0. */
    function IF(vm: VM): void;
    /** Puts n2 + n1 on top of stack. */
    function ADD(vm: VM): void;
    /** Puts n2 - n1 on top of stack. */
    function SUB(vm: VM): void;
    /** Bitwise OR of n1 and n2 */
    function OR(vm: VM): void;
    /** Exclusive OR of n1 and n2 */
    function XOR(vm: VM): void;
    function AND(vm: VM): void;
    function DROP(vm: VM): number;
    function DUP(vm: VM): void;
    function RDROP(vm: VM): number;
    function SWAP(vm: VM): void;
    function OVER(vm: VM): void;
    function RPUSH(vm: VM): void;
}
