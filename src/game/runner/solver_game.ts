import { Game } from "./game";
import { GameState } from "./game_state";
import { MineMap } from "../sized_map/mine_map";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class SolverGame implements Game {
  width: number;
  height: number;
  mineCount: number;
  mineMap: MineMap;

  constructor(gameState: GameState, seed: XorshiftSeed) {
    this.width = gameState.width;
    this.height = gameState.height;
    this.mineCount = gameState.mineCount;
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

  async open(x: number, y: number) {
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
    // return [this.mineMap.print(), "----", this.gameState.print()].join("\n");
  }
}
