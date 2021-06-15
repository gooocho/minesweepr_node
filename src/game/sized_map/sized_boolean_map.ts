export interface SizedBooleanMap {
  width: number;
  height: number;
  isOn(x: number, y: number): boolean;
  adjacentCount(x: number, y: number): number;
  toggle(x: number, y: number): SizedBooleanMap;
  toBinaryStr(): string;
}
