import { Game } from "./game";
import { GameState } from "./game_state";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class OnlineRunner implements Game {
  constructor(gameState: GameState, seed: XorshiftSeed) {}

  static newGame(
    width: number,
    height: number,
    mineCount: number,
    seed: XorshiftSeed
  ) {
    // TODO: sync with server
    return new OnlineRunner(GameState.newGame(width, height, mineCount), seed);
  }

  async open(x: number, y: number) {
    // TODO: sync with server
    return this;
  }

  isOpen(x: number, y: number) {
    // FIXME
    return false;
  }

  number(x: number, y: number) {
    // FIXME
    return 0;
  }

  print() {
    // return [this.gameState.print()].join("\n");
  }
}
