import { SizedBooleanMap } from "./sized_boolean_map";
import { BigintMap } from "./bigint_map";
import { XorshiftSeed } from "../lib/xorshift_seed";
import dedent from "ts-dedent";

export class MineMap {
  width: number;
  height: number;
  dataBody: SizedBooleanMap;

  constructor(width: number, height: number, dataBody: SizedBooleanMap) {
    this.width = width;
    this.height = height;
    this.dataBody = dataBody;
  }

  static newGame(
    width: number,
    height: number,
    mineCount: number,
    seed: XorshiftSeed
  ) {
    // TODO: BigintMap or BooleanMap?
    return new MineMap(
      width,
      height,
      BigintMap.newRandomMap(width, height, mineCount, seed)
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
