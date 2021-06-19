import { BooleanMap } from "../../src/game/sized_map/boolean_map";

describe("BooleanMap", () => {
  test("isOn", () => {
    const width = 6;
    const height = 5;
    const booleanMap1 = new BooleanMap(width, height, [
      ...[...new Array(15)].fill(true),
      ...[...new Array(15)].fill(false),
    ]);

    for (let index = 0; index < 15; ++index) {
      const x = index % width;
      const y = (index - x) / width;
      expect(booleanMap1.isOn(x, y)).toBe(true);
    }

    for (let index = 15; index < 30; ++index) {
      const x = index % width;
      const y = (index - x) / width;
      expect(booleanMap1.isOn(x, y)).toBe(false);
    }
  });

  test("update", () => {
    const trueBooleanMap = new BooleanMap(4, 3, [...new Array(12)].fill(true));
    const falseBooleanMap = new BooleanMap(
      4,
      3,
      [...new Array(12)].fill(false)
    );

    expect(falseBooleanMap.update(1, 2, true).dataBody).toEqual([
      ...[...new Array(9)].fill(false),
      true,
      ...[...new Array(2)].fill(false),
    ]);

    expect(falseBooleanMap.update(2, 1, true).dataBody).toEqual([
      ...[...new Array(6)].fill(false),
      true,
      ...[...new Array(5)].fill(false),
    ]);

    expect(trueBooleanMap.update(2, 1, true).dataBody).toEqual(
      trueBooleanMap.dataBody
    );
    expect(trueBooleanMap.update(1, 2, false).dataBody).toEqual([
      ...[...new Array(9)].fill(true),
      false,
      ...[...new Array(2)].fill(true),
    ]);

    expect(trueBooleanMap.update(2, 1, false).dataBody).toEqual([
      ...[...new Array(6)].fill(true),
      false,
      ...[...new Array(5)].fill(true),
    ]);

    expect(falseBooleanMap.update(2, 1, false).dataBody).toEqual(
      falseBooleanMap.dataBody
    );

    expect(trueBooleanMap.update(2, 1, true).dataBody).not.toBe(
      trueBooleanMap.dataBody
    );
  });

  test("adjacentCount", () => {
    // 111111
    // 111111
    // 111000
    // 000000
    // 000000
    const booleanMap1 = new BooleanMap(6, 5, [
      ...[...new Array(15)].fill(true),
      ...[...new Array(15)].fill(false),
    ]);

    expect(booleanMap1.adjacentCount(0, 0)).toBe(3);
    expect(booleanMap1.adjacentCount(1, 0)).toBe(5);
    expect(booleanMap1.adjacentCount(2, 0)).toBe(5);
    expect(booleanMap1.adjacentCount(3, 0)).toBe(5);
    expect(booleanMap1.adjacentCount(4, 0)).toBe(5);
    expect(booleanMap1.adjacentCount(5, 0)).toBe(3);

    expect(booleanMap1.adjacentCount(0, 1)).toBe(5);
    expect(booleanMap1.adjacentCount(1, 1)).toBe(8);
    expect(booleanMap1.adjacentCount(2, 1)).toBe(7);
    expect(booleanMap1.adjacentCount(3, 1)).toBe(6);
    expect(booleanMap1.adjacentCount(4, 1)).toBe(5);
    expect(booleanMap1.adjacentCount(5, 1)).toBe(3);

    expect(booleanMap1.adjacentCount(0, 2)).toBe(3);
    expect(booleanMap1.adjacentCount(1, 2)).toBe(5);
    expect(booleanMap1.adjacentCount(2, 2)).toBe(4);
    expect(booleanMap1.adjacentCount(3, 2)).toBe(4);
    expect(booleanMap1.adjacentCount(4, 2)).toBe(3);
    expect(booleanMap1.adjacentCount(5, 2)).toBe(2);

    expect(booleanMap1.adjacentCount(0, 3)).toBe(2);
    expect(booleanMap1.adjacentCount(1, 3)).toBe(3);
    expect(booleanMap1.adjacentCount(2, 3)).toBe(2);
    expect(booleanMap1.adjacentCount(3, 3)).toBe(1);
    expect(booleanMap1.adjacentCount(4, 3)).toBe(0);
    expect(booleanMap1.adjacentCount(5, 3)).toBe(0);

    expect(booleanMap1.adjacentCount(0, 4)).toBe(0);
    expect(booleanMap1.adjacentCount(1, 4)).toBe(0);
    expect(booleanMap1.adjacentCount(2, 4)).toBe(0);
    expect(booleanMap1.adjacentCount(3, 4)).toBe(0);
    expect(booleanMap1.adjacentCount(4, 4)).toBe(0);
    expect(booleanMap1.adjacentCount(5, 4)).toBe(0);
  });

  test("toBinaryStr", () => {
    expect(
      new BooleanMap(4, 3, [
        ...[false, false, false, true],
        ...[false, false, true, true],
        ...[false, true, true, true],
      ]).toBinaryStr()
    ).toBe("000100110111");
  });
});
