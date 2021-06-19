import { SizedBooleanMap } from "./sized_boolean_map";

export class BooleanMap implements SizedBooleanMap {
  width: number;
  height: number;
  dataBody: boolean[];

  constructor(width: number, height: number, dataBody: boolean[]) {
    this.width = width;
    this.height = height;
    this.dataBody = dataBody;
  }

  static newFilledMap(width: number, height: number, fillValue: boolean) {
    return new BooleanMap(
      width,
      height,
      [...new Array(width * height)].fill(fillValue)
    );
  }

  is(x: number, y: number, value: boolean) {
    return Boolean(this.dataBody[y * this.width + x]) === value;
  }

  isOn(x: number, y: number): boolean {
    return Boolean(this.dataBody[y * this.width + x]);
  }

  update(x: number, y: number, value: boolean) {
    const dup = [...this.dataBody];
    dup[this.width * y + x] = value;

    return new BooleanMap(
      this.width,
      this.height,
      dup
    );
  }

  adjacentCount(x: number, y: number): number {
    const index = this.width * y + x;
    let offsetList: [number, number, number][] = [
      [-1, -1, -this.width - 1],
      [+0, -1, -this.width],
      [+1, -1, -this.width + 1],
      [-1, +0, -1],
      [+1, +0, 1],
      [-1, +1, this.width - 1],
      [+0, +1, this.width],
      [+1, +1, this.width + 1],
    ];

    return offsetList
      .filter(
        ([offsetX, offsetY, offset]) =>
          !(
            (offsetY === -1 && y === 0) ||
            (offsetY === +1 && y === this.height - 1) ||
            (offsetX === -1 && x === 0) ||
            (offsetX === +1 && x === this.width - 1)
          )
      )
      .map(([offsetX, offsetY, offset]) =>
        Number(this.dataBody[index + offset])
      )
      .reduce((a: number, c: number) => a + c, 0);
  }

  toggle(x: number, y: number) {
    const dup = [...this.dataBody];
    dup[this.width * y + x] = !dup[this.width * y + x];

    return new BooleanMap(this.width, this.height, dup);
  }

  toNumberArray() {
    return this.dataBody.map(Number);
  }

  toBinaryStr() {
    return this.dataBody
      .map(Number)
      .join("")
      .padStart(this.width * this.height, "0");
  }
}
