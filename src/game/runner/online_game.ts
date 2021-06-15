import { Game } from "./game";
import { GameState } from "./game_state";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class OnlineRunner extends Game {
  constructor(gameState: GameState, seed: XorshiftSeed) {
    // TODO: sync with server
    super(gameState);
  }

  static newGame(
    width: number,
    height: number,
    mineCount: number,
    seed: XorshiftSeed
  ) {
    // TODO: sync with server
    return new OnlineRunner(GameState.newGame(width, height, mineCount), seed);
  }

  open(x: number, y: number) {
    // TODO: sync with server
  }

  print() {
    return [this.gameState.print()].join("\n");
  }
}
