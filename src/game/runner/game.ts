import { Rule } from "../types";

export interface Game {
  rule: Rule;

  open(x: number, y: number): Promise<Game>;

  isOpen(x: number, y: number): boolean;

  number(x: number, y: number): number;
}
