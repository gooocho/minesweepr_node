import React from "react";
import { ClosedCell } from "./closed_cell";
import { OpenedCell } from "./opened_cell";
import { GameState } from "../../../game/runner/game_state";

const Cell: React.FC<{
  openCell: (x: number, y: number) => void;
  x: number;
  y: number;
  number: number;
}> = React.memo(({ openCell, x, y, number }) => {
  console.info("render cell", number);
  return number === GameState.EMPTY_CELL ? (
    <ClosedCell
      size={32}
      key={`${x}-${y}`}
      open={() => {
        openCell(x, y);
      }}
    />
  ) : (
    <OpenedCell size={32} key={`${x}-${y}`} number={number} />
  );
});

export { Cell };
