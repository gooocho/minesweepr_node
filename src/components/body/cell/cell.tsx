import React from "react";
import { ClosedCell } from "./closed_cell";
import { OpenedCell } from "./opened_cell";

type PropsType = {
  open: (ev: React.MouseEvent<HTMLElement>) => void,
  isOpen: boolean,
  number: number,
  x: number,
  y: number
};
type StateType = {};

export class Cell extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      number: 0
    };
  }

  render() {
    const x = this.props.x;
    const y = this.props.y;

    return (
      this.props.isOpen ?
        <OpenedCell
          size={32}
          key={`${x}-${y}`}
          number={this.props.number} /> :
        <ClosedCell
          size={32}
          key={`${x}-${y}`}
          open={this.props.open} />
    );
  }
}
