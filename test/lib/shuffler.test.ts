import { Shuffler } from "../../src/game/lib/shuffler";

describe("Shuffler", () => {
  describe("Shuffler.shuffle", () => {
    test("no shuffle", () => {
      const arr = [0, 1, 2, 3, 4, 5];
      expect(Shuffler.shuffle(arr, [0, 0, 0, 0])).toEqual(arr);
    });

    test("with shuffle", () => {
      const arr = [0, 1, 2, 3, 4, 5];
      expect(Shuffler.shuffle(arr, [198, 141, 84, 27])).toEqual([
        2, 4, 5, 1, 3, 0,
      ]);
    });
  });
});
