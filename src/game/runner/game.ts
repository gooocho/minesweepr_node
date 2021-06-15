import { GameState } from "./game_state";
import { NotImprementedError } from "../error/not_impremented_error";
import { XorshiftSeed } from "../lib/xorshift_seed";

export interface Game {
  open(x: number, y: number): Promise<Game>;

  isOpened(x: number, y: number): boolean;

  number(x: number, y: number): number;

  // boom() {}

  // solved() {}
}
