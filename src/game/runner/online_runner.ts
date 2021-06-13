import { Runner } from "./runner";
import { RunnerState } from "./runner_state";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class OnlineRunner extends Runner {
  constructor(runnerState: RunnerState, seed: XorshiftSeed) {
    // TODO: sync with server
    super(runnerState);
  }

  static newGame(width: number, height: number, mineCount: number, seed: XorshiftSeed) {
    // TODO: sync with server
    return new OnlineRunner(RunnerState.newGame(width, height, mineCount), seed);
  }

  open(x: number, y: number) {
    // TODO: sync with server
  }

  print() {
    return [
      this.runnerState.print()
    ].join('\n');
  }
}