import { BigintMap } from "./bigint_map";
import { randomBits } from "../lib/radom_bits";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class MineMap extends BigintMap {
  adjacentCountMap: number[];

  constructor(width: number, height: number, bigintMap: BigintMap) {
    super(width, height, bigintMap.dataBody);

    this.adjacentCountMap = [];
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        this.adjacentCountMap.push(bigintMap.adjacentCount(x, y));
      }
    }
  }

  static newGame(
    width: number,
    height: number,
    mineCount: number,
    seed: XorshiftSeed
  ) {
    return new MineMap(
      width,
      height,
      // TODO: BigintMap or BooleanMap?
      new BigintMap(width, height, randomBits(width * height, mineCount, seed))
    );
  }

  adjacentCount(x: number, y: number) {
    return this.adjacentCountMap[this.width * y + x];
  }
}
