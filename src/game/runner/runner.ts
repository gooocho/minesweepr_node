import { RunnerState } from "./runner_state";
import { NotImprementedError } from "../error/not_impremented_error";
import { XorshiftSeed } from "../lib/xorshift_seed";

export class Runner {
  runnerState: RunnerState;

  constructor(runnerState: RunnerState) {
    this.runnerState = runnerState;
  }

  newGame(width: number, height: number, mineCount: number, seed: XorshiftSeed) {
    throw new NotImprementedError();
  }
  
  open(x: number, y: number) {
    throw new NotImprementedError();
  }

  // boom() {}

  // solved() {}

  print() {
    return this.runnerState.print();
  }
}