const { XorShift128Plus } = require('xorshift.js');
import { XorshiftSeed } from "./xorshift_seed";

export class Shuffler {
  seed: XorshiftSeed;
  // TODO: d.ts
  prng: any;

  constructor(seed: XorshiftSeed) {
    this.seed = seed;
    this.prng = new XorShift128Plus(seed);
  }

  static shuffle<T>(array: Array<T>, seed: XorshiftSeed): Array<T> {
    const prng = new XorShift128Plus(seed);
    const dup = [...array];
    const size = dup.length;
  
    for (let i = 0; i < dup.length; ++i) {
      const exchangeOffset = Math.floor(prng.random() * (size - i));
      [dup[i], dup[i + exchangeOffset]] = [dup[i + exchangeOffset], dup[i]];
    }
  
    return dup;
  }

  shuffle<T>(array: Array<T>): Array<T> {
    const dup = [...array];
    const size = dup.length;
  
    for (let i = 0; i < dup.length; ++i) {
      const exchangeOffset = Math.floor(this.prng.random() * (size - i));
      [dup[i], dup[i + exchangeOffset]] = [dup[i + exchangeOffset], dup[i]];
    }
  
    return dup;
  }
}
