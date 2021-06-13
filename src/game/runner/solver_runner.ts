import { Runner } from "./runner";
import { RunnerState } from "./runner_state";
import { MineMap } from "../sized_map/mine_map";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class SolverRunner extends Runner {
  mineMap: MineMap;

  constructor(runnerState: RunnerState, seed: XorshiftSeed) {
    super(runnerState);
    this.mineMap = MineMap.newGame(
      runnerState.width,
      runnerState.height,
      runnerState.mineCount,
      seed
    )
  }

  static newGame(width: number, height: number, mineCount: number, seed: XorshiftSeed) {
    return new SolverRunner(RunnerState.newGame(width, height, mineCount), seed);
  }

  open(x: number, y: number) {
  }

  print() {
    return [
      this.mineMap.print(),
      '----',
      this.runnerState.print()
    ].join('\n');
  }
}