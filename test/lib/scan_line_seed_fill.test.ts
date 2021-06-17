import { scanLineSeedFill } from "../../src/game/lib/scan_line_seed_fill";
import { NumberMap } from "../../src/game/sized_map/number_map";

describe("scanLineSeedFill", () => {
  test("simple", () => {
    const numberMap = new NumberMap(
      8,
      8,
      [
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 1, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 1, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 1, 0, 0, 0, 0,
        1, 0, 0, 0, 1, 0, 0, 0,
      ],
      64
    );
    expect(scanLineSeedFill(numberMap, 2, 2, 0)).toBe(undefined);
  });
});
