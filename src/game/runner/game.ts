import { GameState } from "./game_state";
import { NotImprementedError } from "../error/not_impremented_error";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class Game {
  gameState: GameState;

  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  newGame(
    width: number,
    height: number,
    mineCount: number,
    seed: XorshiftSeed
  ) {
    throw new NotImprementedError();
  }

  open(x: number, y: number) {
    throw new NotImprementedError();
  }

  // boom() {}

  // solved() {}

  print() {
    return this.gameState.print();
  }
}
