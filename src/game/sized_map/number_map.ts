import { SizedMap } from "./sized_map";
import { ParseError } from "../error/parse_error";
import { ArgumentError } from "../error/argument_error";

export class NumberMap implements SizedMap<number> {
  static EMPTY = -1;
  static EMPTY_STR = "_";

  width: number;
  height: number;
  dataBody: number[];
  dataCount: number;

  constructor(width: number, height: number, dataBody: number[]) {
    this.width = width;
    this.height = height;
    this.dataBody = dataBody;
    this.dataCount = dataBody.filter(
      (number) => number !== NumberMap.EMPTY
    ).length;
  }

  static newFilledMap(width: number, height: number, fillValue: number) {
    return new NumberMap(
      width,
      height,
      [...new Array(width * height)].fill(fillValue)
    );
  }

  static parse(numberStr: string) {
    const dataBody = [];
    // TODO: validation
    const lines = numberStr.split("\n");
    const width = lines[0].length;
    const height = lines.length;

    for (let ch of numberStr) {
      switch (ch) {
        case "\n":
          break;
        case "_":
          dataBody.push(NumberMap.EMPTY);
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
          dataBody.push(Number(ch));
          break;
        default:
          throw new ParseError(`parse failed: ${ch}`);
      }
    }

    return new NumberMap(width, height, dataBody);
  }

  is(x: number, y: number, value: number) {
    return this.dataBody[y * this.width + x] === value;
  }

  number(x: number, y: number) {
    return this.dataBody[y * this.width + x];
  }

  update(x: number, y: number, number: number) {
    const dup = [...this.dataBody];
    dup[this.width * y + x] = number;

    return new NumberMap(this.width, this.height, dup);
  }

  print() {
    const strs = [];
    for (let y = 0; y < this.height; ++y) {
      let str = "";
      for (let x = 0; x < this.width; ++x) {
        const value = this.dataBody[y * this.width + x];
        if (value === NumberMap.EMPTY) {
          str += NumberMap.EMPTY_STR;
        } else {
          str += value.toString();
        }
      }
      strs.push(str);
    }

    return strs.join("\n");
  }
}
