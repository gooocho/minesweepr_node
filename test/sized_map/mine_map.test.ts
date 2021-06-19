import { MineMap } from "../../src/game/sized_map/mine_map";

describe("MineMap", () => {
  test("adjacentCount", () => {
    const mineMap = MineMap.newGame(9, 9, 10, [0, 0, 0, 0]);
    expect(mineMap.adjacentCount(0, 0)).toBe(2);
    expect(mineMap.adjacentCount(1, 1)).toBe(4);
  });
});
