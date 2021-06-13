import { ParseError } from "../error/parse_error";
import { ArgumentError } from "../error/argument_error";

export class NumberMap {
  static EMPTY = -1;
  static EMPTY_STR = "_";

  width: number;
  height: number;
  dataBody: number[];
  dataCount: number;

  constructor(
    width: number,
    height: number,
    dataBody: number[],
    dataCount: number
  ) {
    this.width = width;
    this.height = height;
    this.dataBody = dataBody;
    this.dataCount = dataCount;
  }

  static newFilledMap(width: number, height: number, fillValue: number) {
    return new NumberMap(
      width,
      height,
      [...new Array(width * height)].fill(fillValue),
      width * height
    );
  }

  static parse(numberStr: string) {
    const dataBody = [];
    let dataCount = 0;
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
          ++dataCount;
          break;
        default:
          throw new ParseError(`parse failed: ${ch}`);
      }
    }

    return new NumberMap(width, height, dataBody, dataCount);
  }

  update(x: number, y: number, number: number) {
    const dup = [...this.dataBody];

    const index = this.width * y + x;

    let dataCount = this.dataCount;
    if (dup[index] === NumberMap.EMPTY && number !== NumberMap.EMPTY) {
      ++dataCount;
    } else if (dup[index] !== NumberMap.EMPTY && number === NumberMap.EMPTY) {
      --dataCount;
    } else if (
      (dup[index] === NumberMap.EMPTY && number === NumberMap.EMPTY) ||
      (dup[index] !== NumberMap.EMPTY && number !== NumberMap.EMPTY)
    ) {
      // noop
    } else {
      throw new ArgumentError();
    }

    dup[index] = number;

    return new NumberMap(this.width, this.height, dup, dataCount);
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
