import React from "react";
import { CellList } from "./cell/cell_list";
import { Cell } from "./cell/cell";
import { Game } from "../game/runner/game";

export class Body extends React.Component<{game: Game}, {}> {
  render() {
    const game = this.props.game;

    const matrix = [...new Array(game.height)].map((_, y) =>
      <CellList
        key={y}
        cellList={[...new Array(game.width)].map((_, x) =>
          <Cell
            key={`${x}-${y}`}
            x={x}
            y={y}
            game={game} />
        )} />
    );

    return (
      <div>
        <p>here is Body</p>
        <div>
          { matrix }
        </div>
      </div>
    );
  }
}
