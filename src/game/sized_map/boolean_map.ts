import { SizedBooleanMap } from "./sized_boolean_map";
import { XorshiftSeed } from "../lib/xorshift_seed";
import { Shuffler } from "../lib/shuffler";

// BooleanMap.ON or BooleanMap.OFF
type BooleanInt = number[];

export class BooleanMap implements SizedBooleanMap {
  static OFF = 0;
  static ON = 1;

  width: number;
  height: number;
  dataBody: BooleanInt;

  constructor(width: number, height: number, dataBody: BooleanInt) {
    this.width = width;
    this.height = height;
    this.dataBody = dataBody;
  }

  /**
   * fillValue: BooleanMap.ON or BooleanMap.OFF
   */
  static newFilledMap(width: number, height: number, fillValue: number) {
    return new BooleanMap(
      width,
      height,
      [...new Array(width * height)].fill(fillValue)
    );
  }

  static newRandomMap(
    width: number,
    height: number,
    count: number,
    seed: XorshiftSeed
  ) {
    return new BooleanMap(
      width,
      height,
      Shuffler.shuffle(
        [...new Array(width * height)].fill(0).fill(1, 0, count),
        seed
      )
    );
  }

  isOn(x: number, y: number): boolean {
    return Boolean(this.dataBody[y * this.width + x]);
  }

  surroundingCount(x: number, y: number): number {
    const isTop = Number(y === 0);
    const isBottom = Number(y === this.height - 1);
    const isLeft = Number(x === 0);
    const isRight = Number(x === this.width - 1);
    const positionPattern =
      (isTop << 3) | (isBottom << 2) | (isLeft << 1) | (isRight << 0);
    const centerIndex = this.width * y + x;

    switch (positionPattern) {
      case 0b0000:
        // center
        return (
          this.dataBody[centerIndex - this.width - 1] +
          this.dataBody[centerIndex - this.width + 0] +
          this.dataBody[centerIndex - this.width + 1] +
          this.dataBody[centerIndex - 1] +
          this.dataBody[centerIndex + 1] +
          this.dataBody[centerIndex + this.width - 1] +
          this.dataBody[centerIndex + this.width + 0] +
          this.dataBody[centerIndex + this.width + 1]
        );
      case 0b0001:
        // right edge
        return (
          this.dataBody[centerIndex - this.width - 1] +
          this.dataBody[centerIndex - this.width + 0] +
          this.dataBody[centerIndex - 1] +
          this.dataBody[centerIndex + this.width - 1] +
          this.dataBody[centerIndex + this.width + 0]
        );
      case 0b0010:
        // left edge
        return (
          this.dataBody[centerIndex - this.width + 0] +
          this.dataBody[centerIndex - this.width + 1] +
          this.dataBody[centerIndex + 1] +
          this.dataBody[centerIndex + this.width + 0] +
          this.dataBody[centerIndex + this.width + 1]
        );
      case 0b0100:
        // bottom edge
        return (
          this.dataBody[centerIndex - this.width - 1] +
          this.dataBody[centerIndex - this.width + 0] +
          this.dataBody[centerIndex - this.width + 1] +
          this.dataBody[centerIndex - 1] +
          this.dataBody[centerIndex + 1]
        );
      case 0b0101:
        // bottom right corner
        return (
          this.dataBody[centerIndex - this.width - 1] +
          this.dataBody[centerIndex - this.width + 0] +
          this.dataBody[centerIndex - 1]
        );
      case 0b0110:
        // bottom left corner
        return (
          this.dataBody[centerIndex - this.width + 0] +
          this.dataBody[centerIndex - this.width + 1] +
          this.dataBody[centerIndex + 1]
        );
      case 0b1000:
        // top edge
        return (
          this.dataBody[centerIndex - 1] +
          this.dataBody[centerIndex + 1] +
          this.dataBody[centerIndex + this.width - 1] +
          this.dataBody[centerIndex + this.width + 0] +
          this.dataBody[centerIndex + this.width + 1]
        );
      case 0b1001:
        // top right corner
        return (
          this.dataBody[centerIndex - 1] +
          this.dataBody[centerIndex + this.width - 1] +
          this.dataBody[centerIndex + this.width + 0]
        );
      case 0b1010:
        // top left corner
        return (
          this.dataBody[centerIndex + 1] +
          this.dataBody[centerIndex + this.width + 0] +
          this.dataBody[centerIndex + this.width + 1]
        );
      // impossible
      // case 0b0011:
      // case 0b0111:
      // case 0b1011:
      // case 0b1100:
      // case 0b1101:
      // case 0b1110:
      // case 0b1111:
      default:
        // out of bounds
        return -1;
    }
  }

  toggle(x: number, y: number) {
    const dup = [...this.dataBody];
    dup[this.width * y + x] =
      dup[this.width * y + x] === BooleanMap.OFF
        ? BooleanMap.ON
        : BooleanMap.OFF;

    return new BooleanMap(this.width, this.height, dup);
  }

  toBinaryStr() {
    return this.dataBody.join("").padStart(this.width * this.height, "0");
  }
}
