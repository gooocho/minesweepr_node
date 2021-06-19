import React from "react";
import { CellList } from "./cell/cell_list";
import { Cell } from "./cell/cell";
import { Game } from "../../game/runner/game";
import { LocalGame } from "../../game/runner/local_game";
import { XorshiftSeed } from "../../game/lib/xorshift_seed";

type PropsType = {
  width: number;
  height: number;
  mineCount: number;
  seed: XorshiftSeed;
};
type StateType = { game: Game };

export class Body extends React.Component<PropsType, StateType> {
  openCell: (x: number, y: number) => void;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      game: LocalGame.newGame(
        props.width,
        props.height,
        props.mineCount,
        props.seed
      ),
    };
    this.openCell = ((x: number, y: number) => this.handleOpen(x, y)).bind(
      this
    );
  }

  handleOpen(x: number, y: number) {
    this.state.game.open(x, y).then(
      (updatedGame: Game) => {
        this.setState({ game: updatedGame });
      },
      (rejected: any) => {
        console.info("boom(click event)");
      }
    );
  }

  render() {
    const matrix = [...new Array(this.state.game.height)].map((_, y) => (
      <CellList
        key={y}
        cellList={[...new Array(this.state.game.width)].map((_, x) => (
          <Cell
            key={`${x}-${y}`}
            x={x}
            y={y}
            isOpen={this.state.game.isOpen(x, y)}
            number={this.state.game.number(x, y)}
            openCell={this.openCell}
          />
        ))}
      />
    ));

    return <div>{matrix}</div>;
  }
}
