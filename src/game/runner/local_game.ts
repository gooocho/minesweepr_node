import { Game as Game } from "./game";
import { GameState } from "./game_state";
import { MineMap } from "../sized_map/mine_map";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class LocalGame implements Game {
  width: number;
  height: number;
  mineCount: number;
  gameState: GameState;
  mineMap: MineMap;

  constructor(gameState: GameState, mineMap: MineMap) {
    this.width = gameState.width;
    this.height = gameState.height;
    this.mineCount = gameState.mineCount;
    this.gameState = gameState;
    this.mineMap = mineMap;
  }

  static newGame(
    width: number,
    height: number,
    mineCount: number,
    seed: XorshiftSeed
  ) {
    return new LocalGame(
      GameState.newGame(width, height, mineCount),
      MineMap.newGame(width, height, mineCount, seed)
    );
  }

  async chording(x: number, y: number) {
    // TODO: count adjacent flags
    // TODO: if surrounidngFlagCount === this.numberMap.number(x, y)
    // adjacent.forEach((x, y) => { this.open(x, y) })
  }

  async open(x: number, y: number): Promise<LocalGame> {
    // TODO: fetch data from repository
    if (this.gameState.isFlag(x, y)) {
      // noop
      return this;
    }

    if (this.mineMap.isMine(x, y)) {
      this.boom();
      // FIXME: update to dead state
      return this;
    } else {
      const adjacentMineCount = this.mineMap.adjacentCount(x, y);
      this.gameState = this.gameState.open(x, y, adjacentMineCount);
      if (this.isWin()) {
        this.win();
      }
      return new LocalGame(
        this.gameState.open(x, y, adjacentMineCount),
        this.mineMap
      );
    }
  }

  isOpened(x: number, y: number) {
    return this.gameState.isOpened(x, y);
  }

  number(x: number, y: number) {
    return this.gameState.number(x, y);
  }

  toggleFlag(x: number, y: number) {
    // FIXME: update flagMap
    this.gameState.toggleFlag(x, y);
  }

  boom() {
    // game over
    console.info("boom");
  }

  isWin() {
    return this.gameState.isWin();
  }

  win() {
    // tada-
    // win this game!
    console.info("win");
  }

  print() {
    return [this.mineMap.print(), "----", this.gameState.print()].join("\n");
  }
}
