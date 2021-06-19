import { SizedMap } from "../sized_map/sized_map";
import { BooleanMap } from "../sized_map/boolean_map";

// starting from (x, y), collect cells that are not adjacented to mines
export function scanLineSeedFill<T>(
  paintMap: SizedMap<T>,
  x: number,
  y: number,
  value: T
) {
  const width = paintMap.width;
  const height = paintMap.height;
  let paintedMap = BooleanMap.newFilledMap(width, height, false);

  const seedStack = [[x, y]];

  let seed;
  while ((seed = seedStack.pop())) {
    const [seedX, seedY] = seed;

    if (paintedMap.is(seedX, seedY, true)) {
      continue;
    }

    let lx = seedX;
    while (lx - 1 >= 0 && paintMap.is(lx - 1, seedY, value)) {
      --lx;
    }

    let rx = seedX;
    while (rx + 1 < width && paintMap.is(rx + 1, seedY, value)) {
      ++rx;
    }

    // paint
    for (let x = lx; x <= rx; ++x) {
      paintedMap = paintedMap.update(x, seedY, true);
    }

    // find and push next seeds
    [
      [lx, rx, seedY + 1],
      [lx, rx, seedY - 1],
    ]
      .filter(([lx, rx, nextY]) => nextY >= 0 && nextY < height)
      .forEach(([lx, rx, nextY]) => {
        let currentX = lx;

        while (currentX <= rx) {
          while (currentX <= rx && !paintMap.is(currentX, nextY, value)) {
            ++currentX;
          }

          if (currentX === rx + 1) {
            break;
          }

          while (currentX <= rx && paintMap.is(currentX, nextY, value)) {
            ++currentX;
          }

          seedStack.push([currentX - 1, nextY]);
        }
      });
  }

  return paintedMap;
}
