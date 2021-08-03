import { Rule } from "../types";
import { NumberMap } from "../sized_map/number_map";
import { BooleanMap } from "../sized_map/boolean_map";
import { SizedBooleanMap } from "../sized_map/sized_boolean_map";

export class GameState {
  static EMPTY_CELL = NumberMap.EMPTY;

  rule: Rule;
  numberMap: NumberMap;
  flagMap: SizedBooleanMap;

  constructor(rule: Rule, numberMap: NumberMap, flagMap: SizedBooleanMap) {
    this.rule = rule;
    this.numberMap = numberMap;
    this.flagMap = flagMap;
  }

  static newGame(rule: Rule) {
    return new GameState(
      rule,
      NumberMap.newFilledMap(rule.width, rule.height, GameState.EMPTY_CELL),
      // FIXME: BooleanMap or BigintMap?
      BooleanMap.newFilledMap(rule.width, rule.height, false)
    );
  }

  isFlag(x: number, y: number) {
    return this.flagMap.isOn(x, y);
  }

  isOpen(x: number, y: number) {
    return this.numberMap.number(x, y) !== GameState.EMPTY_CELL;
  }

  number(x: number, y: number) {
    return this.numberMap.number(x, y);
  }

  update(x: number, y: number, value: number) {
    return new GameState(
      this.rule,
      this.numberMap.update(x, y, value),
      this.flagMap
    );

    // this.numberMap = this.numberMap.update(x, y, value);
    // return this;
  }

  updateMultiple(list: { x: number; y: number; value: number }[]) {
    return new GameState(
      this.rule,
      this.numberMap.updateMultiple(list),
      this.flagMap
    );

    // this.numberMap = this.numberMap.updateMultiple(list);
    // return this;
  }

  toggleFlag(x: number, y: number) {
    return new GameState(this.rule, this.numberMap, this.flagMap.toggle(x, y));
  }

  isWin() {
    return (
      this.numberMap.dataCount + this.rule.mineCount ===
      this.rule.width * this.rule.height
    );
  }

  print() {
    return [...new Array(this.rule.height)]
      .map((_, y) =>
        [...new Array(this.rule.height)]
          .map((_, x) => {
            const index = y * this.rule.width + x;
            if (this.flagMap.isOn(x, y)) {
              return "|";
            } else {
              return this.numberMap.dataBody[index] === GameState.EMPTY_CELL
                ? "_"
                : this.numberMap.dataBody[index];
            }
          })
          .join("")
      )
      .join("\n");
  }
}
