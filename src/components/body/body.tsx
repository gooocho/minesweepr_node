import React from "react";
const { useState } = React;
import { CellList } from "./cell/cell_list";
import { Cell } from "./cell/cell";
import { LocalGame } from "../../game/runner/local_game";
import { XorshiftSeed, Rule } from "../../game/types";

const Body: React.FC<{
  rule: Rule;
}> = ({ rule }) => {
  const [game, setGame] = useState(LocalGame.newGame(rule, [0, 0, 0, 0]));

  const matrix = [...new Array(rule.height)].map((_, y) => (
    <CellList
      key={y}
      children={[...new Array(rule.width)].map((_, x) => (
        <Cell
          key={`${x}-${y}`}
          x={x}
          y={y}
          isOpen={game.isOpen(x, y)}
          number={game.number(x, y)}
          openCell={(x, y) => {
            game.open(x, y).then(
              (updatedGame) => {
                setGame(updatedGame);
              },
              (rejected: any) => {
                console.info("boom(click event)");
              }
            );
          }}
        />
      ))}
    />
  ));

  return <div>{matrix}</div>;
};

export { Body };
