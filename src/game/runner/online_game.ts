import { Rule } from "../types";
import { Game } from "./game";
import { GameState } from "./game_state";
import { XorshiftSeed } from "../types";

export class OnlineRunner implements Game {
  rule: Rule;
  gameState: GameState;
  seed: XorshiftSeed;

  constructor(gameState: GameState, seed: XorshiftSeed) {
    this.rule = gameState.rule;
    this.gameState = gameState;
    this.seed = seed;
  }

  static newGame(rule: Rule, seed: XorshiftSeed) {
    // TODO: sync with server
    return new OnlineRunner(GameState.newGame(rule), seed);
  }

  async open(x: number, y: number) {
    // TODO: sync with server
    return new OnlineRunner(this.gameState, this.seed);
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
