import React from "react";
import { CellList } from "./cell/cell_list";
import { Cell } from "./cell/cell";
import { Game } from "../../game/runner/game";

type PropsType = {game: Game};
type StateType = {game: Game};

export class Body extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      game: props.game
    };
  }

  handleOpen(x: number, y: number) {
    this
      .state
      .game
      .open(x, y)
      .then(
        (updatedGame: Game) => {
          this.setState({
            game: updatedGame
          });
        },
        (rejected: any) => {
          console.info('boom(click event)');
        }
      );
  }

  render() {
    if (!this.state) {
      return <></>;
    }

    const matrix = [...new Array(this.state.game.height)].map((_, y) =>
      <CellList
        key={y}
        cellList={[...new Array(this.state.game.width)].map((_, x) =>
          <Cell
            key={`${x}-${y}`}
            x={x}
            y={y}
            isOpen={this.state.game.isOpen(x, y)}
            number={this.state.game.number(x, y)}
            open={(ev: React.MouseEvent<HTMLElement>) => {
              this.handleOpen(x, y);
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
