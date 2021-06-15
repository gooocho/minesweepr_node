import { Game } from "./game";
import { GameState } from "./game_state";
import { MineMap } from "../sized_map/mine_map";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class SolverGame extends Game {
  mineMap: MineMap;

  constructor(gameState: GameState, seed: XorshiftSeed) {
    super(gameState);
    this.mineMap = MineMap.newGame(
      gameState.width,
      gameState.height,
      gameState.mineCount,
      seed
    );
  }

  static newGame(
    width: number,
    height: number,
    mineCount: number,
    seed: XorshiftSeed
  ) {
    return new SolverGame(GameState.newGame(width, height, mineCount), seed);
  }

  open(x: number, y: number) {}

  print() {
    return [this.mineMap.print(), "----", this.gameState.print()].join("\n");
  }
}
