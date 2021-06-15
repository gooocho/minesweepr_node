import { Runner } from "./runner";
import { RunnerState } from "./runner_state";
import { MineMap } from "../sized_map/mine_map";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class LocalRunner extends Runner {
  runnerState: RunnerState;
  mineMap: MineMap;

  constructor(runnerState: RunnerState, seed: XorshiftSeed) {
    super(runnerState);

    this.runnerState = runnerState;
    this.mineMap = MineMap.newGame(
      runnerState.width,
      runnerState.height,
      runnerState.mineCount,
      seed
    );
  }

  static newGame(width: number, height: number, mineCount: number, seed: XorshiftSeed) {
    return new LocalRunner(
      RunnerState.newGame(width, height, mineCount),
      seed
    );
  }

  async chording(x: number, y: number) {
    // TODO: count adjacent flags
    // TODO: if surrounidngFlagCount === this.numberMap.number(x, y)
    // adjacent.forEach((x, y) => { this.open(x, y) })
  }

  async open(x: number, y: number) {
    // TODO: fetch data from repository
    if (this.runnerState.isFlag(x, y)) {
      return;
    }

    if (this.mineMap.isMine(x, y)) {
      this.boom();
    } else {
      const adjacentMineCount = this.mineMap.adjacentCount(x, y);
      this.runnerState = this.runnerState.open(x, y, adjacentMineCount);
      if (this.isWin()) {
        this.win();
      }
    }
  }

  toggleFlag(x: number, y: number) {
    this.runnerState.toggleFlag(x, y);
  }

  boom() {
    // game over
    console.info('boom');
  }

  isWin() {
    return this.runnerState.isWin();
  }

  win() {
    // tada-
    // win this game!
    console.info('win');
  }

  print() {
    return [
      this.mineMap.print(),
      '----',
      this.runnerState.print()
    ].join('\n');
  }
}