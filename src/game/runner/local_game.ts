import { Rule } from "../types";
import { Game } from "./game";
import { GameState } from "./game_state";
import { MineMap } from "../sized_map/mine_map";
import { XorshiftSeed } from "../types";
import { Boom } from "../error/boom_error";
import { scanLineSeedFill } from "../lib/scan_line_seed_fill";

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

export class LocalGame implements Game {
  rule: Rule;
  gameState: GameState;
  mineMap: MineMap;

  constructor(gameState: GameState, mineMap: MineMap) {
    this.rule = gameState.rule;
    this.gameState = gameState;
    this.mineMap = mineMap;
  }

  static newGame(rule: Rule, seed: XorshiftSeed) {
    return new LocalGame(GameState.newGame(rule), MineMap.newGame(rule, seed));
  }

  async chording(x: number, y: number) {
    // TODO: count adjacent flags
    // TODO: if surrounidngFlagCount === this.numberMap.number(x, y)
    // adjacent.forEach((x, y) => { this.open(x, y) })
  }

  open(x: number, y: number): Promise<LocalGame> {
    return new Promise((fulfilled) => {
      return fulfilled(this.openRun(x, y));
    });
  }

  async openRun(x: number, y: number): Promise<LocalGame> {
    // await sleep(x * 200);

    // TODO: fetch data from repository
    if (this.gameState.isFlag(x, y)) {
      // noop
      return this;
    }

    if (this.mineMap.isOn(x, y)) {
      this.boom();
      // FIXME: update to dead state
      throw new Boom();
    } else {
      const updateCells =
        this.mineMap.adjacentCount(x, y) === 0
          ? [...scanLineSeedFill(this.mineMap, x, y, false)]
              .filter(({ value }) => value)
              .map(({ x, y }) => ({
                x,
                y,
                value: this.mineMap.adjacentCount(x, y),
              }))
          : [{ x, y, value: this.mineMap.adjacentCount(x, y) }];

      const updatedGame = new LocalGame(
        this.gameState.updateMultiple(updateCells),
        this.mineMap
      );

      if (updatedGame.isWin()) {
        updatedGame.win();
      }

      return updatedGame;
    }
  }

  isOpen(x: number, y: number) {
    return this.gameState.isOpen(x, y);
  }

  number(x: number, y: number) {
    return this.gameState.number(x, y);
  }

  numbers() {
    return [...this.gameState.numberMap].map((el) => el.value);
  }

  toggleFlag(x: number, y: number) {
    return new LocalGame(this.gameState.toggleFlag(x, y), this.mineMap);
  }

  boom() {
    // game over
    console.info("boom(game)");
  }

  isWin() {
    return this.gameState.isWin();
  }

  win() {
    // tada-
    // win this game!
    console.info("win");
  }
}
