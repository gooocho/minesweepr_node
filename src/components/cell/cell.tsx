import React from "react";
import { Game } from "../../game/runner/game";
import { ClosedCell } from "./closed_cell";
import { OpenedCell } from "./opened_cell";
import { NumberMap } from "../../game/sized_map/number_map";

export class Cell extends React.Component<any, any> {
  x: number;
  y: number;
  open: (x: number, y: number) => Promise<Game>;

  constructor(props: any) {
    super(props);
    this.open = props.open;
    this.x = props.x;
    this.y = props.y;

    this.state = {
      opened: false,
      number: NumberMap.EMPTY
    };
  }

  handleClick(x: number, y: number) {
    console.info('handleClick', x, y);
    this
      .open(this.props.x, this.props.y)
      .then(
        (fulfilled) => {
          console.info('fulfilled', fulfilled);
        },
        (rejected) => {
          console.info('rejected', rejected);
        }
      );
  }

  render() {
    const x = this.x;
    const y = this.y;

    return (
      this.state.opened ?
        <OpenedCell
          size="32"
          key={`${x}-${y}`}
          x={x}
          y={y}
          number={this.state.number} /> :
        <ClosedCell
          size="32"
          key={`${x}-${y}`}
          x={x}
          y={y}
          handleClick={(x: number, y: number) => this.handleClick(x, y)} />
    );
  }
}
