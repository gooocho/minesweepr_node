import React from "react";
import { CellList } from "./cell/cell_list";
import { Cell } from "./cell/cell";

export class Body extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.localGame
    };
  }

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
            opened={game.isOpen(x, y)}
            number={game.number(x, y)}
            open={async (x: number, y: number) => await game.open(x, y)} />
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
