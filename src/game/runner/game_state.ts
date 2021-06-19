import { NumberMap } from "../sized_map/number_map";
import { BooleanMap } from "../sized_map/boolean_map";
import { SizedBooleanMap } from "../sized_map/sized_boolean_map";

export class GameState {
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
    return new GameState(
      width,
      height,
      mineCount,
      NumberMap.newFilledMap(width, height, NumberMap.EMPTY),
      // FIXME: BooleanMap or BigintMap?
      BooleanMap.newFilledMap(width, height, false)
    );
  }

  isFlag(x: number, y: number) {
    return this.flagMap.isOn(x, y);
  }

  isOpen(x: number, y: number) {
    return this.numberMap.number(x, y) !== NumberMap.EMPTY;
  }

  number(x: number, y: number) {
    return this.numberMap.number(x, y);
  }

  update(x: number, y: number, adjacentMineCount: number) {
    return new GameState(
      this.width,
      this.height,
      this.mineCount,
      this.numberMap.update(x, y, adjacentMineCount),
      this.flagMap
    );
  }

  toggleFlag(x: number, y: number) {
    return new GameState(
      this.width,
      this.height,
      this.mineCount,
      this.numberMap,
      this.flagMap.toggle(x, y)
    );
  }

  isWin() {
    return this.numberMap.dataCount === this.mineCount;
  }

  print() {
    return [...new Array(this.height)]
      .map((_, y) =>
        [...new Array(this.height)]
          .map((_, x) => {
            const index = y * this.width + x;
            if (this.flagMap.isOn(x, y)) {
              return "|";
            } else {
              return this.numberMap.dataBody[index] === NumberMap.EMPTY
                ? "_"
                : this.numberMap.dataBody[index];
            }
          })
          .join("")
      )
      .join("\n");
  }
}
