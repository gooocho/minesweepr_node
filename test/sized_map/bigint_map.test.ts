import { BigintMap } from "../../src/game/sized_map/bigint_map";

describe("BigintMap", () => {
  test("isOn", () => {
    const width = 6;
    const height = 5;
    // 111111
    // 111111
    // 111000
    // 000000
    // 000000
    const bigintMap1 = new BigintMap(6, 5, 0b000000000000000111111111111111n);

    for (let index = 0; index < 15; ++index) {
      const x = index % width;
      const y = (index - x) / width;
      expect(bigintMap1.isOn(x, y)).toBe(true);
    }

    for (let index = 15; index < 30; ++index) {
      const x = index % width;
      const y = (index - x) / width;
      expect(bigintMap1.isOn(x, y)).toBe(false);
    }
  });

  test("update", () => {
    expect(
      new BigintMap(4, 3, 0b000000000000n).update(1, 2, true).dataBody
    ).toBe(0b001000000000n);
    expect(
      new BigintMap(4, 3, 0b000000000000n).update(2, 1, true).dataBody
    ).toBe(0b000001000000n);
    expect(
      new BigintMap(4, 3, 0b000001000000n).update(2, 1, true).dataBody
    ).toBe(0b000001000000n);

    expect(
      new BigintMap(4, 3, 0b000011100000n).update(2, 1, false).dataBody
    ).toBe(0b000010100000n);
    expect(
      new BigintMap(4, 3, 0b000011100000n).update(0, 0, false).dataBody
    ).toBe(0b000011100000n);
  });

  test("adjacentCount", () => {
    // 111111
    // 111111
    // 111000
    // 000000
    // 000000
    const bigintMap1 = new BigintMap(6, 5, 0b000000000000000111111111111111n);

    expect(bigintMap1.adjacentCount(0, 0)).toBe(3);
    expect(bigintMap1.adjacentCount(1, 0)).toBe(5);
    expect(bigintMap1.adjacentCount(2, 0)).toBe(5);
    expect(bigintMap1.adjacentCount(3, 0)).toBe(5);
    expect(bigintMap1.adjacentCount(4, 0)).toBe(5);
    expect(bigintMap1.adjacentCount(5, 0)).toBe(3);

    expect(bigintMap1.adjacentCount(0, 1)).toBe(5);
    expect(bigintMap1.adjacentCount(1, 1)).toBe(8);
    expect(bigintMap1.adjacentCount(2, 1)).toBe(7);
    expect(bigintMap1.adjacentCount(3, 1)).toBe(6);
    expect(bigintMap1.adjacentCount(4, 1)).toBe(5);
    expect(bigintMap1.adjacentCount(5, 1)).toBe(3);

    expect(bigintMap1.adjacentCount(0, 2)).toBe(3);
    expect(bigintMap1.adjacentCount(1, 2)).toBe(5);
    expect(bigintMap1.adjacentCount(2, 2)).toBe(4);
    expect(bigintMap1.adjacentCount(3, 2)).toBe(4);
    expect(bigintMap1.adjacentCount(4, 2)).toBe(3);
    expect(bigintMap1.adjacentCount(5, 2)).toBe(2);

    expect(bigintMap1.adjacentCount(0, 3)).toBe(2);
    expect(bigintMap1.adjacentCount(1, 3)).toBe(3);
    expect(bigintMap1.adjacentCount(2, 3)).toBe(2);
    expect(bigintMap1.adjacentCount(3, 3)).toBe(1);
    expect(bigintMap1.adjacentCount(4, 3)).toBe(0);
    expect(bigintMap1.adjacentCount(5, 3)).toBe(0);

    expect(bigintMap1.adjacentCount(0, 4)).toBe(0);
    expect(bigintMap1.adjacentCount(1, 4)).toBe(0);
    expect(bigintMap1.adjacentCount(2, 4)).toBe(0);
    expect(bigintMap1.adjacentCount(3, 4)).toBe(0);
    expect(bigintMap1.adjacentCount(4, 4)).toBe(0);
    expect(bigintMap1.adjacentCount(5, 4)).toBe(0);
  });

  test("toBinaryStr", () => {
    expect(new BigintMap(4, 3, 0b111011001000n).toBinaryStr()).toBe(
      "000100110111"
    );
  });
});
