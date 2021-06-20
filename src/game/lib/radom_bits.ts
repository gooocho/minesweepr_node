// TODO: get random implementation from DI container

// import { XorShift } from "xorshift.js";
// TODO: make d.ts
const { XorShift128Plus } = require("xorshift.js");
import { XorshiftSeed } from "../types";

// if seed is 0, random() always return 0.
// const prng0 = new XorShift128Plus([0, 0, 0, 0]);
// prng0.random(); // 0
// prng0.random(); // 0
// prng0.random(); // 0

// const prng1 = new XorShift128Plus([1, 0, 2, 0]);
// const prng2 = new XorShift128Plus('000000010000000000000002');
// assert(prng1.random() === prng2.random());

function fisherYatesN(bits: bigint, size: number, seed: XorshiftSeed) {
  const prng1 = new XorShift128Plus(seed);

  for (let i = 0; i < size - 1; ++i) {
    // exchange i_th bit and target bit

    // (10111...)  ...        0                ...             1           (...0100010)
    //  top                 target   <-- exchangeOffsetN -->   i_th           exchanged
    //
    // ithMaskN:
    // (00000...)  ...        0                ...              1           (...0000000)
    //
    // exchangePattern:
    // (00000...)  ... (target xor i_th)       ...       (target xor i_th)  (...0000000)

    const exchangeOffsetN = BigInt(Math.floor(prng1.random() * (size - i)));
    const ithMaskN = 1n << BigInt(i);
    const exchangeXorBit = ((bits >> exchangeOffsetN) ^ bits) & ithMaskN;
    const exchangePattern =
      exchangeXorBit | (exchangeXorBit << exchangeOffsetN);
    bits ^= exchangePattern;
  }
  return bits;
}

export function randomBits(size: number, bitCount: number, seed: XorshiftSeed) {
  return fisherYatesN((1n << BigInt(bitCount)) - 1n, size, seed);
}
