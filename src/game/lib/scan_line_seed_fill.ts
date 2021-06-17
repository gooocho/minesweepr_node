import { SizedMap } from "../sized_map/sized_map";
import { BooleanMap } from "../sized_map/boolean_map";
type Coord = [number, number];

// starting from (x, y), collect cells that are not adjacented to mines
export function scanLineSeedFill<T>(
  sizedMap: SizedMap<T>,
  x: number,
  y: number,
  value: T
) {
}
