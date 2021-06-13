import { randomBits } from "../../src/game/lib/radom_bits";

describe("randomBits", () => {
  test("no shuffle", () => {
    expect(randomBits(3, 2, [0, 0, 0, 0])).toBe(0b011n);
    expect(randomBits(5, 3, [0, 0, 0, 0])).toBe(0b00111n);
    expect(randomBits(10, 5, [0, 0, 0, 0])).toBe(0b0000011111n);
    expect(randomBits(10, 10, [0, 0, 0, 0])).toBe(0b1111111111n);
  });

  test("with shuffle", () => {
    expect(randomBits(10, 3, [198, 141, 84, 27])).toBe(0b0010110000n);
  });
});
