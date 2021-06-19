import React from "react";

type PropsType = {
  size: number,
  handleClick: (ev: React.MouseEvent<HTMLElement>) => void
};

export class ClosedCell extends React.Component<PropsType, {}> {
  render() {
    const className = `closed${this.props.size}`;
    return (
      <button
        className={className}
        onClick={this.props.handleClick} />
    );
  }
}
