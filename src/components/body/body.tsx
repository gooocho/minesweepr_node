import React from "react";
const { useState, useCallback } = React;
import { CellList } from "./cell/cell_list";
import { Cell } from "./cell/cell";
import { LocalGame } from "../../game/runner/local_game";
import { GameState } from "../../game/runner/game_state";
import { XorshiftSeed, Rule } from "../../game/types";

const Body: React.FC<{
  rule: Rule;
  seed: XorshiftSeed;
}> = ({ rule, seed }) => {
  let game = LocalGame.newGame(rule, seed);

  const defaultCellState = [...new Array(rule.width * rule.height)].fill(
    GameState.EMPTY_CELL
  );

  const [cellState, setCellState] = useState(defaultCellState);

  const openCell = useCallback((x, y) => {
    game.open(x, y).then(
      (updatedGame) => {
        // update game, but not render
        game = updatedGame;
        // update state, and render
        setCellState((current) => {
          return game.numbers();
        });
      },
      (rejected: any) => {
        console.info("boom(click event)");
      }
    );
  }, []);

  const matrix = [...new Array(rule.height)].map((_, y) => (
    <CellList
      key={y}
      children={[...new Array(rule.width)].map((_, x) => (
        <Cell
          key={`${x}-${y}`}
          x={x}
          y={y}
          number={cellState[rule.width * y + x]}
          openCell={openCell}
        />
      ))}
    />
  ));

  return <div>{matrix}</div>;
};

export { Body };
