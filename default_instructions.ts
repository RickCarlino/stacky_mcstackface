import { VM } from "./vm";
/** The standard set of instructions that come with the VM. */
export namespace DefaultInstructions {
  /** Increment IP by 1 (no operation).
   * ( -- )
   */
  export function NOOP(vm: VM) { return vm.buffer[++vm.IP]; }
  
  /** Pushes memory address after IP onto parameter stack.
   * ( -- )
   */
  export function PUSH(vm: VM) {
    vm.buffer[vm.PSP] = NOOP(vm);
    vm.PSP--;
    NOOP(vm);
  }
  
  /** Stores n2 into memory address listed in n1(value, addr -- ) */
  export function STORE(vm: VM) {
    let addr = DROP(vm);
    let val = DROP(vm);
    if(vm.buffer[addr] !== undefined) {
      vm.buffer[addr] = val;
    } else {
      throw new Error(`Memory address ${ addr } out of range (only ${ vm.buffer.length } words)`)
    }
    NOOP(vm); // Move IP ontop of literal value
  }
  
  /** Places contents of arbitrary memory address onto top of stack
   * ( addr -- addr contents )
  */
  export function FETCH(vm: VM) {
    // Possible off by one???
    // Pop memory address from top of stack.
    let addr = DROP(vm);
    let val = vm.buffer[addr];
    vm.buffer[vm.PSP] = val;
    vm.PSP--;
    NOOP(vm);
  }
  
  /** Pushes current IP onto return stack and jumps into memory address as
   * top of stack
   */
  export function CALL(vm: VM) {
    vm.buffer[vm.RSP] = vm.IP + 1;
    vm.RSP--
    vm.IP = DROP(vm);
  }
  
  /** Pops top of return stack and sets IP to that address. */
  export function RETURN(vm: VM) { vm.IP = RDROP(vm); }
  
  /** Jumps to adress n2 if n1 is 0. */
  export function IF(vm: VM) {
    // If N1 is false (value is 0)
    if(!NOOP(vm)) {
      vm.IP = NOOP(vm);
    } else {
      vm.IP += 2;
    };
  }
  
  /** Puts n2 + n1 on top of stack. */
  export function ADD(vm: VM) {
    vm.buffer[vm.PSP + 2] = DROP(vm) + DROP(vm);
    vm.IP++
    vm.PSP--;
  }

  /** Puts n2 - n1 on top of stack. */  
  export function SUB(vm: VM) {
    let a = DROP(vm);
    let b = DROP(vm);
  
    vm.buffer[vm.PSP] = b - a;
    vm.IP++
    vm.PSP--;
  }
  
  /** Bitwise OR of n1 and n2 */
  export function OR(vm: VM) {
    let a = DROP(vm);
    let b = DROP(vm);
  
    vm.buffer[vm.PSP] = b | a;
    vm.IP++
    vm.PSP--;
  }
  
  /** Exclusive OR of n1 and n2 */
  export function XOR(vm: VM) {
    let a = DROP(vm);
    let b = DROP(vm);
  
    vm.buffer[vm.PSP] = b ^ a;
    vm.IP++
    vm.PSP--;
  }
  
  export function AND(vm: VM) {
    let a = DROP(vm);
    let b = DROP(vm);
  
    vm.buffer[vm.PSP] = b & a;
    vm.IP++
    vm.PSP--;
  }
  
  export function DROP(vm: VM): number {
    vm.PSP++;
    let val = vm.buffer[vm.PSP];
    vm.buffer[vm.PSP] = 0; // This is for ease of debugging. Not required.
    return val;
  }
  
  export function DUP(vm: VM) {
    vm.buffer[vm.PSP] = vm.buffer[vm.PSP + 1];
    vm.PSP--    
    vm.IP++
  }
  
  export function RDROP(vm: VM) {
    vm.RSP++;
    let val = vm.buffer[vm.RSP];
    vm.buffer[vm.RSP] = 0; // This is for ease of debugging. Not required.
    return val;
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
  // Add MUL DIV LSHIFT and RSHIFT
  // Rename PUSH to LIT to stay consistent with text???  
  // Add stack overflow/underflow exceptions or interupts?
  // Add I/O interupts (hardware CALL to address 0 like an M17?) and/or SYSCALL for output
}
