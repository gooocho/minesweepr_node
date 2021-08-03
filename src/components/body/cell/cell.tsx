import React from "react";
import { ClosedCell } from "./closed_cell";
import { OpeningCell } from "./opening_cell";
import { OpenedCell } from "./opened_cell";
import { GameState } from "../../../game/runner/game_state";

const Cell: React.FC<{
  openCell: (x: number, y: number) => void;
  x: number;
  y: number;
  number: number;
  opening: boolean;
}> = React.memo(({ openCell, x, y, number, opening }) => {
  console.info(`render cell: (${x}, ${y}), ${number}`);

  if (number !== GameState.EMPTY_CELL) {
    return <OpenedCell size={32} key={`${x}-${y}`} number={number} />;
  } else if (opening) {
    return <OpeningCell size={32} key={`${x}-${y}`} />;
  } else {
    return (
      <ClosedCell
        size={32}
        key={`${x}-${y}`}
        open={() => {
          console.info(`open: (${x}, ${y})`);
          openCell(x, y);
        }}
      />
    );
  }
});

export { Cell };
