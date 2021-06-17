import { SizedBooleanMap } from "./sized_boolean_map";
import { BigintMap } from "./bigint_map";
import { randomBits } from "../lib/radom_bits";
import { XorshiftSeed } from "../lib/xorshift_seed";
import dedent from "ts-dedent";

export class MineMap {
  width: number;
  height: number;
  dataBody: SizedBooleanMap;
  adjacentMap: number[];

  constructor(width: number, height: number, dataBody: SizedBooleanMap) {
    this.width = width;
    this.height = height;
    this.dataBody = dataBody;

    this.adjacentMap = [];
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        this.adjacentMap.push(dataBody.adjacentCount(x, y));
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
      new BigintMap(
        width,
        height,
        randomBits(width * height, mineCount, seed)
      )
    );
  }

  isMine(x: number, y: number) {
    return this.dataBody.isOn(x, y);
  }

  adjacentCount(x: number, y: number) {
    return this.dataBody.adjacentCount(x, y);
  }

  print() {
    const reg = new RegExp(`.{${this.width}}`, "g");
    const mineMapStr = this.dataBody.toBinaryStr();
    return dedent`
      width: ${this.width}
      height: ${this.height}
      mineMap:
      ${(mineMapStr.match(reg) || []).join("\n")}`;
  }
}
