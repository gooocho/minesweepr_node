import { NumberMap } from "../../src/game/sized_map/number_map";
import dedent from "ts-dedent";

describe("NumberMap", () => {
  test("parse pattern1", () => {
    const numberMapStr = dedent`
      ____
      ____
      ____
    `;
    const numberMap = NumberMap.parse(numberMapStr);
    expect(numberMap.width).toBe(4);
    expect(numberMap.height).toBe(3);
    expect(numberMap.dataCount).toBe(0);
    expect(numberMap.print()).toBe(numberMapStr);
  });

  test("parse pattern2", () => {
    const numberMapStr = dedent`
      11211
      3___1
      ___11
    `;
    const numberMap = NumberMap.parse(numberMapStr);
    expect(numberMap.width).toBe(5);
    expect(numberMap.height).toBe(3);
    expect(numberMap.dataCount).toBe(9);
    expect(numberMap.print()).toBe(numberMapStr);
  });

  test("update pattern1", () => {
    const numberMap = NumberMap.newFilledMap(3, 2, NumberMap.EMPTY);
    const updatedMap = numberMap.update(0, 0, 0);
    expect(updatedMap.print()).toBe(dedent`
      0__
      ___
    `);
    expect(updatedMap.dataCount).toBe(1);
  });

  test("update pattern2", () => {
    const numberMap = NumberMap.newFilledMap(3, 2, NumberMap.EMPTY);
    const updatedMap = numberMap
      .update(0, 0, 1)
      .update(0, 1, 1)
      .update(1, 0, 2);
    expect(updatedMap.print()).toBe(dedent`
      12_
      1__
    `);
    expect(updatedMap.dataCount).toBe(3);
  });
});
