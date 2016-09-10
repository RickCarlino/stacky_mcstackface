//WORKS CITED:
// * http://www.figuk.plus.com/build/heart.htm
// * http://www.bradrodriguez.com/papers/moving1.htm
// * http://www.forth.org/svfig/Len/Quitloop.htm
// FUN IDEAS:
// * Canvas graphics memory
// * Port to WASM
// * FlashFORTH Emu

/** A slice of bits representing the FORTH memory area. */
export class Memory {
    /** Raw JS memory buffer. */
    public buffer: Uint16Array;
    /** The Working Register.
     * Provides an address from which the data field of the currently executing word can be found.
     * */
    public W: number;
    /** The Instruction Pointer.
     *  Points to the next exection token to be executed
     */
    public IP: number;
    /** The Parameter Stack Pointer.
     *  Gives access to the data stack.
     * */
    public PSP: number;
    /** The Return Stack Pointer. */
    public RSP: number;
    /** A working register */
    public X: number;
    /** Top of Stack Cache. */
    public TOS: number;
    /** User Pointer. Base address of the task's user area. */
    public UP: number;

    constructor(/** Memory size limit */
                public size: number = 4096) {
      this.buffer = new Uint16Array(size);
      var ok = this.buffer[0];
    }

    resetRSP() {

    };
}

