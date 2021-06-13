import { MineMap } from "../../src/game/sized_map/mine_map";
import dedent from 'ts-dedent';

test('test', () => {
  const field1 = MineMap.newGame(9, 9, 10, [0, 0, 0, 0]);
  expect(field1.print()).toBe(dedent`
    width: 9
    height: 9
    mineMap:
    111111111
    100000000
    000000000
    000000000
    000000000
    000000000
    000000000
    000000000
    000000000
  `);
});
