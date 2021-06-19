import React from "react";
import { Game } from "../../game/runner/game";
import { ClosedCell } from "./closed_cell";
import { OpenedCell } from "./opened_cell";
import { NumberMap } from "../../game/sized_map/number_map";

export class Cell extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      opened: false,
      number: NumberMap.EMPTY
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev: React.MouseEvent<HTMLElement>) {
    this
      .props
      .game
      .open(this.props.x, this.props.y)
      .then(
        (fulfilled: any) => {
          this.setState({
            opened: true,
            number: fulfilled.gameState.number(this.props.x, this.props.y)
          });
        },
        (rejected: any) => {
          console.info('boom(click event)');
        }
      );
  }

  render() {
    console.info(`render called: Cell`);
    const x = this.props.x;
    const y = this.props.y;

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
          handleClick={this.handleClick} />
    );
  }
}
