import React from "react";
import { CellList } from "./cell/cell_list";
import { Cell } from "./cell/cell";
import { Game } from "../../game/runner/game";

type PropsType = {game: Game, handleOpen: (x: number, y: number) => void};
type StateType = {};

export class Body extends React.Component<PropsType, StateType> {
  render() {
    const matrix = [...new Array(this.props.game.height)].map((_, y) =>
      <CellList
        key={y}
        cellList={[...new Array(this.props.game.width)].map((_, x) =>
          <Cell
            key={`${x}-${y}`}
            x={x}
            y={y}
            isOpen={this.props.game.isOpen(x, y)}
            number={this.props.game.number(x, y)}
            open={(ev: React.MouseEvent<HTMLElement>) => {
              this.props.handleOpen(x, y);
            }} />
        )} />
    );

    return (
      <div>
        { matrix }
      </div>
    );
  }
}
