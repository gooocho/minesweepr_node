import React from "react";
import { ClosedCell } from "./closed_cell";
import { OpenedCell } from "./opened_cell";

const Cell: React.FC<{
  openCell: (x: number, y: number) => void;
  x: number;
  y: number;
  isOpen: boolean;
  number: number;
}> = ({ openCell, x, y, isOpen, number }) => {
  console.info("render cell");
  return isOpen ? (
    <OpenedCell size={32} key={`${x}-${y}`} number={number} />
  ) : (
    <ClosedCell
      size={32}
      key={`${x}-${y}`}
      open={() => {
        openCell(x, y);
      }}
    />
  );
};

export { Cell };
