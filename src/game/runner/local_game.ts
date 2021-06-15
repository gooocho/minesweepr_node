import { Game as Game } from "./game";
import { GameState } from "./game_state";
import { MineMap } from "../sized_map/mine_map";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class LocalGame extends Game {
  width: number;
  height: number;
  mineCount: number;
  gameState: GameState;
  mineMap: MineMap;

  constructor(gameState: GameState, seed: XorshiftSeed) {
    super(gameState);

    this.width = gameState.width;
    this.height = gameState.height;
    this.mineCount = gameState.mineCount;
    this.gameState = gameState;
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
    return new LocalGame(GameState.newGame(width, height, mineCount), seed);
  }

  async chording(x: number, y: number) {
    // TODO: count adjacent flags
    // TODO: if surrounidngFlagCount === this.numberMap.number(x, y)
    // adjacent.forEach((x, y) => { this.open(x, y) })
  }

  async open(x: number, y: number) {
    // TODO: fetch data from repository
    if (this.gameState.isFlag(x, y)) {
      return;
    }

    if (this.mineMap.isMine(x, y)) {
      this.boom();
    } else {
      const adjacentMineCount = this.mineMap.adjacentCount(x, y);
      this.gameState = this.gameState.open(x, y, adjacentMineCount);
      if (this.isWin()) {
        this.win();
      }
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
