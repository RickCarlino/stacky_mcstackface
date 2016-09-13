import { VM } from "./vm";
/** The standard set of instructions that come with the VM. */
export namespace DefaultInstructions {
  /** No operation.
   * ( -- )
   */
  export function NOOP(vm: VM) {
    vm.IP++;
  }
  
  /** Pushes memory address after IP onto parameter stack.
   * ( -- )
   */
  export function PUSH(vm: VM) {
    vm.IP++; // Move IP ontop of literal value
    vm.buffer[vm.PSP] = vm.buffer[vm.IP];
    vm.PSP--; // Grow stack.
    vm.IP++; // Goto next instruction
  }
  
  /** Stores n2 into memory address listed in n1
   * (value, addr -- )
  */
  export function STORE(vm: VM) {
    let addr = DROP(vm);
    let val = DROP(vm);
    vm.IP++; // Move IP ontop of literal value
  }
  
  /** Places contents of arbitrary memory address onto top of stack*/
  export function FETCH(vm: VM) {
    console.log("PENDING...");
    
  }
  
  /** Pushes current IP onto return stack and jumps into memory address as
   * top of stack
   */
  export function CALL(vm: VM) {
    console.log("PENDING...");
    
  }
  
  /** Pops top of return stack and sets IP to that address. */
  export function RETURN(vm: VM) {
    console.log("PENDING...");
    
  }
  
  /** Jumps to adress n2 if n1 is 0. */
  export function IF(vm: VM) {
    console.log("PENDING...");
    
  }
  
  /** Puts n2 + n1 on top of stack. */
  export function ADD(vm: VM) {
    console.log("PENDING...");
    
  }

  /** Puts n2 - n1 on top of stack. */  
  export function SUB(vm: VM) {
    console.log("PENDING...");
    
  }
  
  /** Bitwise OR of n1 and n2 */
  export function OR(vm: VM) {
    console.log("PENDING...");
    
  }
  
  /** Exclusive OR of n1 and n2 */
  export function XOR(vm: VM) {
    console.log("PENDING...");
    
  }
  
  export function AND(vm: VM) {
    console.log("PENDING...");
    
  }
  
  export function DROP(vm: VM) {
    vm.PSP--;
    let val = vm.buffer[vm.PSP];
    vm.buffer[vm.PSP] = 0; // This is for ease of debugging. Not required.
    return val;
  }
  
  export function DUP(vm: VM) {
    console.log("PENDING...");
    
  }
  
  export function OVER(vm: VM) {
    console.log("PENDING...");
    
  }
  
  export function SWAP(vm: VM) {
    console.log("PENDING...");
    
  }
  
  export function RPUSH(vm: VM) {
    console.log("PENDING...");
    
  }
  
  export function RPOP(vm: VM) {
    console.log("PENDING...");
    
  }
  // Add OUT for output?
  // Add JMP? Just use IF? Hmmm...
}
