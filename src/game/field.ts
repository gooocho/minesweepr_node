import { randomBits } from "./radom_bits";

/**
 * Field have bomb position information and surrounding bomb count;
 */
export class Field {
  width: number;
  height: number;
  size: number;

  /**
   * bomb position in bigint bitmap
   * [example]
   * width: 3
   * height: 4
   * bombmap: 0011_0100_1101
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
   * |B.BB|
   * |..B.|
   * |BB..|
   * +----+
   */
  bombMap: bigint;

  /**
   * bombCount: Integer[]
   * [example]
   * width: 3
   * height: 4
   * bombmap: 0011_0100_1101
   * 
   * will provide
   * 
   * [0, 3, 2, 2, 3, 5, 3, 3, 1, 2, 2, 1]
   * 
   * will represent
   * +----+
   * |0322|
   * |3533|
   * |1221|
   * +----+
   */
  bombCount: number[];

  constructor(width: number, height: number, bombMap: bigint) {
    this.width = width;
    this.height = height;
    this.size = width * height;
    this.bombMap = bombMap;
    this.bombCount = this.calcbombCount(this.width, this.height, this.bombMap);
  }

  static newField(width: number, height: number, bomb: number) {
    return new Field(width, height, randomBits(width * height, bomb));
  }

  calcbombCount(width: number, height: number, bombMap: bigint) {
    return [...new Array(width * height)].map((_, index) => {
      const x = index % width;
      const y = (index - x) / width;
      return this
               .surroundingIndexes(x, y)
               .map(cellIndex => bombMap & (1n << BigInt(cellIndex)))
               .reduce((a, c) => a + (c == 0n ? 0 : 1), 0);
    });
  }

  surroundingIndexes(x: number, y: number): number[] {
    const isTop = Number(y === 0);
    const isBottom = Number(y === this.height - 1);
    const isLeft = Number(x === 0);
    const isRight = Number(x === this.width - 1);
    const bitPattern = (isTop << 3) | (isBottom << 2) | (isLeft << 1) | (isRight << 0);
    switch(bitPattern) {
      case 0b0000:
        // center
        return [
          this.width * (y - 1) + x - 1,
          this.width * (y - 1) + x + 0,
          this.width * (y - 1) + x + 1,
          this.width * (y + 0) + x - 1,
          this.width * (y + 0) + x + 1,
          this.width * (y + 1) + x - 1,
          this.width * (y + 1) + x + 0,
          this.width * (y + 1) + x + 1,
        ];
      case 0b0001:
        // right edge
        return [
          this.width * (y - 1) + x - 1,
          this.width * (y - 1) + x + 0,
          this.width * (y + 0) + x - 1,
          this.width * (y + 1) + x - 1,
          this.width * (y + 1) + x + 0,
        ];
      case 0b0010:
        // left edge
        return [
          this.width * (y - 1) + x + 0,
          this.width * (y - 1) + x + 1,
          this.width * (y + 0) + x + 1,
          this.width * (y + 1) + x + 0,
          this.width * (y + 1) + x + 1,
        ];
      case 0b0100:
        // bottom edge
        return [
          this.width * (y - 1) + x - 1,
          this.width * (y - 1) + x + 0,
          this.width * (y - 1) + x + 1,
          this.width * (y + 0) + x - 1,
          this.width * (y + 0) + x + 1,
        ];
      case 0b0101:
        // bottom right corner
        return [
          this.width * (y - 1) + x - 1,
          this.width * (y - 1) + x + 0,
          this.width * (y + 0) + x - 1,
        ];
      case 0b0110:
        // bottom left corner
        return [
          this.width * (y - 1) + x + 0,
          this.width * (y - 1) + x + 1,
          this.width * (y + 0) + x + 1,
        ];
      case 0b1000:
        // top edge
        return [
          this.width * (y + 0) + x - 1,
          this.width * (y + 0) + x + 1,
          this.width * (y + 1) + x - 1,
          this.width * (y + 1) + x + 0,
          this.width * (y + 1) + x + 1,
        ];
      case 0b1001:
        // top right corner
        return [
          this.width * (y + 0) + x - 1,
          this.width * (y + 1) + x + 0,
          this.width * (y + 1) + x - 1,
        ];
      case 0b1010:
        // top left corner
        return [
          this.width * (y + 0) + x + 1,
          this.width * (y + 1) + x + 0,
          this.width * (y + 1) + x + 1,
        ];
      case 0b0011:
      case 0b1011:
      case 0b1100:
      case 0b1101:
      case 0b1110:
      case 0b1111:
      default:
        // impossible
        return [];
    }
  }

  print() {
    const reg = new RegExp(`.{${this.width}}`, 'g');
    const bombMapStr = this.bombMap.toString(2).padStart(this.width * this.height, "0").split('').reverse().join('');
    const bombCountStr = this.bombCount.join('');
    return (
`width: ${this.width}
height: ${this.height}
bombMap:
${(bombMapStr.match(reg) || []).join('\n')}
bombCount:
${(bombCountStr.match(reg) || []).join('\n')}
`
    );
  }
}