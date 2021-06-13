type bitCountMask = {
  topMask: bigint;
  bottomMask: bigint;
  offset: bigint;
};

function log2Length(bigint: bigint) {
  let exponential = 2n;
  let length = 1n;
  while (exponential <= bigint) {
    exponential **= exponential;
    ++length;
  }
  return length;
}

function bitMaskList(maskCount: bigint): bitCountMask[] {
  const maskPatterns = [];

  for (let iN = 1n; iN <= maskCount; ++iN) {
    const maskUnitLength = 2n ** iN;
    let mask = 2n ** (maskUnitLength / 2n) - 1n;

    // duplicate masks
    for (let jN = 0n; jN + iN < maskCount; ++jN) {
      mask |= mask << (maskUnitLength * 2n ** jN);
    }

    // [example]
    // [{
    //     topMask:    10101010,
    //     bottomMask: 01010101,
    //     offset:     1
    // }, {
    //     topMask:    11001100,
    //     bottomMask: 00110011,
    //     offset:     2
    // }, {
    //     topMask:    11110000,
    //     bottomMask: 00001111,
    //     offset:     4
    // }]
    maskPatterns.push({
      topMask: mask << (2n ** (iN - 1n)),
      bottomMask: mask,
      offset: maskUnitLength / 2n,
    });
  }

  return maskPatterns;
}

const memo: bitCountMask[][] = [];
function memoizedBitMaskList(maskCountN: bigint): bitCountMask[] {
  const maskCount = Number(maskCountN);
  return memo[maskCount] || (memo[maskCount] = bitMaskList(maskCountN));
}

export function bigintBitCount(bigint: bigint) {
  const maskCount = log2Length(bigint);
  const maskPatterns = memoizedBitMaskList(maskCount);
  for (let { offset, topMask, bottomMask } of maskPatterns) {
    bigint = ((bigint & topMask) >> offset) + (bigint & bottomMask);
  }
  return Number(bigint);
}
