import { SizedBooleanMap } from "./sized_boolean_map";

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

  is(x: number, y: number, value: boolean) {
    const xN = BigInt(x);
    const yN = BigInt(y);
    const indexN = this.widthN * yN + xN;
    return ((this.dataBody >> indexN) & 1n) === BigInt(value);
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

    let offsetList: [number, number, bigint][] = [
      [-1, -1, -this.widthN - 1n],
      [+0, -1, -this.widthN],
      [+1, -1, -this.widthN + 1n],
      [-1, +0, -1n],
      [+1, +0, 1n],
      [-1, +1, this.widthN - 1n],
      [+0, +1, this.widthN],
      [+1, +1, this.widthN + 1n],
    ];

    return Number(
      offsetList
        .filter(
          ([offsetX, offsetY, offset]) =>
            !(
              (offsetY === -1 && y === 0) ||
              (offsetY === +1 && y === this.height - 1) ||
              (offsetX === -1 && x === 0) ||
              (offsetX === +1 && x === this.width - 1)
            )
        )
        .map(
          ([offsetX, offsetY, offset]) =>
            (this.dataBody >> (indexN + offset)) & 1n
        )
        .reduce((a: bigint, c: bigint) => a + c, 0n)
    );
  }

  toggle(x: number, y: number) {
    return new BigintMap(
      this.width,
      this.height,
      this.dataBody ^ (1n << BigInt(this.width * y + x))
    );
  }

  toNumberArray() {
    return [...new Array(this.width * this.height)].map((_, index) =>
      Number(this.dataBody & (1n << BigInt(index)))
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
