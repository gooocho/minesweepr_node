import { LocalGame } from "../../src/game/runner/local_game";
import dedent from 'ts-dedent';

test('test', () => {
  const localGame1 = LocalGame.newGame(9, 9, 10, [0, 0, 0, 0]);
  expect(localGame1.print()).toBe(dedent`
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
    ----
    _________
    _________
    _________
    _________
    _________
    _________
    _________
    _________
    _________
  `);
});