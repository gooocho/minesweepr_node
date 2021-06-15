import React from "react";
import { Game } from "../../game/runner/game";
import { ClosedCell } from "./closed_cell";
import { OpenedCell } from "./opened_cell";

export class Cell extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      opened: props.opened,
      number: props.number
    };
  }

  render() {
    const x = this.state.x;
    const y = this.state.y;

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
          handleClick={(value: any) => {
            console.info('hello world', value);
          }} />
    );
  }
}
