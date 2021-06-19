import React from "react";
import { CellList } from "./cell/cell_list";
import { Cell } from "./cell/cell";

export class Body extends React.Component<any, any> {
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
        <pre>
          { game.mineMap.print() }
        </pre>
      </div>
    );
  }
}
