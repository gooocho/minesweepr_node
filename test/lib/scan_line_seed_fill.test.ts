import { scanLineSeedFill } from "../../src/game/lib/scan_line_seed_fill";
import { NumberMap } from "../../src/game/sized_map/number_map";
import dedent from "ts-dedent";

describe("scanLineSeedFill", () => {
  test("simple1", () => {
    const numberMap = new NumberMap(2, 2, [...[0, 0], ...[0, 0]]);
    expect(scanLineSeedFill(numberMap, 0, 0, 0).toBinaryStr()).toEqual(
      `1111`.split("\n").join("")
    );
  });

  test("simple2", () => {
    const numberMap = new NumberMap(8, 3, [
      ...[0, 0, 0, 0, 0, 0, 0, 0],
      ...[0, 1, 0, 1, 1, 1, 0, 1],
      ...[0, 1, 0, 0, 1, 0, 0, 0],
    ]);
    expect(scanLineSeedFill(numberMap, 0, 0, 0).toBinaryStr()).toEqual(
      dedent`
      11111111
      10100010
      10110111
    `
        .split("\n")
        .join("")
    );
  });

  test("complex", () => {
    const numberMap = new NumberMap(8, 8, [
      ...[1, 0, 0, 0, 0, 0, 0, 0],
      ...[0, 0, 1, 0, 1, 1, 1, 0],
      ...[0, 0, 0, 0, 1, 0, 1, 0],
      ...[1, 0, 0, 1, 0, 0, 0, 0],
      ...[0, 1, 0, 0, 1, 0, 1, 1],
      ...[1, 0, 0, 1, 0, 1, 0, 0],
      ...[1, 0, 0, 1, 0, 0, 1, 0],
      ...[1, 0, 0, 0, 0, 0, 1, 0],
    ]);
    expect(scanLineSeedFill(numberMap, 2, 2, 0).toBinaryStr()).toEqual(
      dedent`
      01111111
      11010001
      11110101
      01101111
      00110100
      01101000
      01101100
      01111100
    `
        .split("\n")
        .join("")
    );
  });
});
