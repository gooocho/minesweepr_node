import { Rule } from "../types";
import { Game } from "./game";
import { GameState } from "./game_state";
import { MineMap } from "../sized_map/mine_map";
import { XorshiftSeed } from "../types";

export class SolverGame implements Game {
  rule: Rule;
  mineMap: MineMap;

  constructor(gameState: GameState, seed: XorshiftSeed) {
    this.rule = gameState.rule;
    this.mineMap = MineMap.newGame(gameState.rule, seed);
  }

  static newGame(rule: Rule, seed: XorshiftSeed) {
    return new SolverGame(GameState.newGame(rule), seed);
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
