import { VM } from "./vm";
/** The standard set of instructions that come with the VM. */
export namespace DefaultInstructions {
   // Add JMP? Just use IF? Hmmm...

  /** No operation.
   * ( -- )
   */
  export function NOOP(vm: VM) {
    
  }
  
  /** Pushes memory address after IP onto parameter stack.
   * ( -- )
   */
  export function PUSH(vm: VM) {
    
  }
  
  /** Stores n2 into memory address listed in n1
   * (n2, n1 -- )
  */
  export function STORE(vm: VM) {
    
  }
  
  /** Places contents of arbitrary memory address onto top of stack*/
  export function FETCH(vm: VM) {
    
  }
  
  /** Pushes current IP onto return stack and jumps into memory address as
   * top of stack
   */
  export function CALL(vm: VM) {
    
  }
  
  /** Pops top of return stack and sets IP to that address. */
  export function RETURN(vm: VM) {
    
  }
  
  /** Jumps to adress n2 if n1 is 0. */
  export function IF(vm: VM) {
    
  }
  
  /** Puts n2 + n1 on top of stack. */
  export function ADD(vm: VM) {
    
  }

  /** Puts n2 - n1 on top of stack. */  
  export function SUB(vm: VM) {
    
  }
  
  /** Bitwise OR of n1 and n2 */
  export function OR(vm: VM) {
    
  }
  
  /** Exclusive OR of n1 and n2 */
  export function XOR(vm: VM) {
    
  }
  
  export function AND(vm: VM) {
    
  }
  
  export function DROP(vm: VM) {
    
  }
  
  export function DUP(vm: VM) {
    
  }
  
  export function OVER(vm: VM) {
    
  }
  
  export function SWAP(vm: VM) {
    
  }
  
  export function RPUSH(vm: VM) {
    
  }
  
  export function RPOP(vm: VM) {
    
  }
  ; // Add JMP? Just use IF? Hmmm...
}