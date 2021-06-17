import { SizedMap } from "./sized_map";

export interface SizedBooleanMap extends SizedMap<boolean> {
  isOn(x: number, y: number): boolean;
  adjacentCount(x: number, y: number): number;
  toggle(x: number, y: number): SizedBooleanMap;
  toNumberArray(): number[];
  toBinaryStr(): string;
}
