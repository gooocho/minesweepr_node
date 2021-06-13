import { NumberMap } from "../sized_map/number_map";
import { BooleanMap } from "../sized_map/boolean_map";
import { SizedBooleanMap } from "../sized_map/sized_boolean_map";

export class RunnerState {
  width: number;
  height: number;
  mineCount: number;
  numberMap: NumberMap;
  flagMap: SizedBooleanMap;

  constructor(
    width: number,
    height: number,
    mineCount: number,
    numberMap: NumberMap,
    flagMap: SizedBooleanMap
  ) {
    this.width = width;
    this.height = height;
    this.mineCount = mineCount;
    this.numberMap = numberMap;
    this.flagMap = flagMap;
  }

  static newGame(width: number, height: number, mineCount: number) {
    return new RunnerState(
      width,
      height,
      mineCount,
      NumberMap.newFilledMap(width, height, NumberMap.EMPTY),
      BooleanMap.newFilledMap(width, height, BooleanMap.OFF)
    );
  }

  isFlag(x: number, y: number) {
    return this.flagMap.isOn(x, y);
  }

  open(x: number, y: number, surroundingMineCount: number) {
    // FIXME: update numberMap
    return new RunnerState(
      this.width,
      this.height,
      this.mineCount,
      this.numberMap,
      this.flagMap
    );
  }

  toggleFlag(x: number, y: number) {
    // FIXME: update flagMap
    return new RunnerState(
      this.width,
      this.height,
      this.mineCount,
      this.numberMap,
      this.flagMap
    );
  }

  isWin() {
    return this.numberMap.dataCount === this.mineCount;
  }

  print() {
    const strs = [];
    for (let y = 0; y < this.height; ++y) {
      let str = "";
      for (let x = 0; x < this.width; ++x) {
        const index = y * this.width + x;
        if (this.flagMap.isOn(x, y)) {
          str += "|";
        } else {
          str +=
            this.numberMap.dataBody[index] === NumberMap.EMPTY
              ? "_"
              : this.numberMap.dataBody[index];
        }
      }
      strs.push(str);
    }
    return strs.join("\n");
  }
}
