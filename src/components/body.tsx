import React from "react";
import { CellList } from "./cell/cell_list";
import { ClosedCell } from "./cell/closed_cell";
import { OpenedCell } from "./cell/opened_cell";
import { Game } from "../game/runner/game";

export class Body extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.localGame
    };
  }

  onChange() {
    console.info('onChange');
  }

  cell(game: Game, x: number, y: number) {
    return (
      game.isOpened(x, y) ?
        <OpenedCell
          size="32"
          key={`${x}-${y}`}
          x={x}
          y={y}
          number={game.number(x, y)} /> :
        <ClosedCell
          size="32"
          key={`${x}-${y}`}
          x={x}
          y={y}
          handleClick={(value: any) => {
            console.info('hello world', value);
          }} />
    );
  }

  render() {
    const game = this.props.game;

    const matrix = [...new Array(game.height)].map((_, y) => {
      const cellList = [...new Array(game.width)].map((_, x) => this.cell(game, x, y));
      return (
        <CellList
          key={y}
          cellList={cellList} />
      );
    })

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
