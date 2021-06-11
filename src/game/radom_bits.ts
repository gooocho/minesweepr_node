function fisherYatesN(bits: bigint, size: number) {
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

    const exchangeOffsetN = BigInt(Math.floor(Math.random() * (size - i)));
    const ithMaskN = 1n << BigInt(i);
    const exchangeXorBit = ((bits >> exchangeOffsetN) ^ bits) & ithMaskN;
    const exchangePattern = exchangeXorBit | (exchangeXorBit << exchangeOffsetN);
    bits ^= exchangePattern;
  }
  return bits;
}

export function randomBits(size: number, count: number) {
  return fisherYatesN((1n << BigInt(count)) - 1n, size);
}
