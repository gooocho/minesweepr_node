import React from "react";
import { ClosedCell } from "./closed_cell";
import { OpenedCell } from "./opened_cell";

type PropsType = {
  openCell: (x: number, y: number) => void;
  x: number;
  y: number;
  isOpen: boolean;
  number: number;
};
type StateType = {};

export class Cell extends React.Component<PropsType, StateType> {
  openClosedCell: (ev: React.MouseEvent<HTMLElement>) => void;

  constructor(props: PropsType) {
    super(props);
    this.openClosedCell = (ev: React.MouseEvent<HTMLElement>) =>
      this.props.openCell(this.props.x, this.props.y);
  }

  render() {
    console.info("render cell");
    const x = this.props.x;
    const y = this.props.y;

    return this.props.isOpen ? (
      <OpenedCell size={32} key={`${x}-${y}`} number={this.props.number} />
    ) : (
      <ClosedCell size={32} key={`${x}-${y}`} open={this.openClosedCell} />
    );
  }
}
