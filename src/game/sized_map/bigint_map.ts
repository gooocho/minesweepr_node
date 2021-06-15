import { SizedBooleanMap } from "./sized_boolean_map";
import { randomBits } from "../lib/radom_bits";
import { bigintBitCount } from "../lib/bigint_bitcount";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class BigintMap implements SizedBooleanMap {
  static OFF = 0n;
  static ON = 1n;

  width: number;
  height: number;
  widthN: bigint;
  heightN: bigint;

  /**
   * [example]
   * width: 3
   * height: 4
   * mineMap: 0011_0100_1101
   *               |||| ||||
   *               |||| ||| `-- [0, 0]
   *               |||| || `--- [0, 1]
   *               |||| | `---- [0, 2]
   *               ||||  `----- [0, 3]
   *               ||| `------- [1, 0]
   *               || `-------- [1, 1]
   *               | `--------- [1, 2]
   *                `---------- [1, 3]
   * will represent
   * +----+
   * |1011|
   * |0010|
   * |1100|
   * +----+
   */
  dataBody: bigint;

  constructor(width: number, height: number, dataBody: bigint) {
    this.width = width;
    this.height = height;
    this.widthN = BigInt(width);
    this.heightN = BigInt(height);
    this.dataBody = dataBody;
  }

  /**
   * fillValue: BigintMap.ON or BigintMap.OFF
   */
  static newFilledMap(width: number, height: number, fillValue: bigint) {
    return new BigintMap(
      width,
      height,
      fillValue === BigintMap.OFF ? 0n : (1n << BigInt(width * height)) - 1n
    );
  }

  static newRandomMap(
    width: number,
    height: number,
    count: number,
    seed: XorshiftSeed
  ) {
    return new BigintMap(
      width,
      height,
      randomBits(width * height, count, seed)
    );
  }

  isOn(x: number, y: number): boolean {
    const xN = BigInt(x);
    const yN = BigInt(y);
    return Boolean(this.dataBody & (1n << (this.widthN * yN + xN)));
  }

  adjacentCount(x: number, y: number): number {
    const xN = BigInt(x);
    const yN = BigInt(y);
    const indexN = this.widthN * yN + xN;

    const isTop = Number(y === 0);
    const isBottom = Number(y === this.height - 1);
    const isLeft = Number(x === 0);
    const isRight = Number(x === this.width - 1);
    const positionPattern =
      (isTop << 3) | (isBottom << 2) | (isLeft << 1) | (isRight << 0);

    switch (positionPattern) {
      case 0b0000:
        // center
        return bigintBitCount(
          this.dataBody &
            ((1n << (indexN - this.widthN - 1n)) |
              (1n << (indexN - this.widthN + 0n)) |
              (1n << (indexN - this.widthN + 1n)) |
              (1n << (indexN - 1n)) |
              (1n << (indexN + 1n)) |
              (1n << (indexN + this.widthN - 1n)) |
              (1n << (indexN + this.widthN + 0n)) |
              (1n << (indexN + this.widthN + 1n)))
        );
      case 0b0001:
        // right edge
        return bigintBitCount(
          this.dataBody &
            ((1n << (indexN - this.widthN - 1n)) |
              (1n << (indexN - this.widthN + 0n)) |
              (1n << (indexN - 1n)) |
              (1n << (indexN + this.widthN - 1n)) |
              (1n << (indexN + this.widthN + 0n)))
        );
      case 0b0010:
        // left edge
        return bigintBitCount(
          this.dataBody &
            ((1n << (indexN - this.widthN + 0n)) |
              (1n << (indexN - this.widthN + 1n)) |
              (1n << (indexN + 1n)) |
              (1n << (indexN + this.widthN + 0n)) |
              (1n << (indexN + this.widthN + 1n)))
        );
      case 0b0100:
        // bottom edge
        return bigintBitCount(
          this.dataBody &
            ((1n << (indexN - this.widthN - 1n)) |
              (1n << (indexN - this.widthN + 0n)) |
              (1n << (indexN - this.widthN + 1n)) |
              (1n << (indexN - 1n)) |
              (1n << (indexN + 1n)))
        );
      case 0b0101:
        // bottom right corner
        return bigintBitCount(
          this.dataBody &
            ((1n << (indexN - this.widthN - 1n)) |
              (1n << (indexN - this.widthN + 0n)) |
              (1n << (indexN - 1n)))
        );
      case 0b0110:
        // bottom left corner
        return bigintBitCount(
          this.dataBody &
            ((1n << (indexN - this.widthN + 0n)) |
              (1n << (indexN - this.widthN + 1n)) |
              (1n << (indexN + 1n)))
        );
      case 0b1000:
        // top edge
        return bigintBitCount(
          this.dataBody &
            ((1n << (indexN - 1n)) |
              (1n << (indexN + 1n)) |
              (1n << (indexN + this.widthN - 1n)) |
              (1n << (indexN + this.widthN + 0n)) |
              (1n << (indexN + this.widthN + 1n)))
        );
      case 0b1001:
        // top right corner
        return bigintBitCount(
          this.dataBody &
            ((1n << (indexN - 1n)) |
              (1n << (indexN + this.widthN - 1n)) |
              (1n << (indexN + this.widthN + 0n)))
        );
      case 0b1010:
        // top left corner
        return bigintBitCount(
          this.dataBody &
            ((1n << (indexN + 1n)) |
              (1n << (indexN + this.widthN + 0n)) |
              (1n << (indexN + this.widthN + 1n)))
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
    return new BigintMap(
      this.width,
      this.height,
      this.dataBody ^ (1n << BigInt(this.width * y + x))
    );
  }

  toBinaryStr() {
    return this.dataBody
      .toString(2)
      .padStart(this.width * this.height, "0")
      .split("")
      .reverse()
      .join("");
  }
}
