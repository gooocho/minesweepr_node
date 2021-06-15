import React from "react";

export class ClosedCell extends React.Component<any, any> {
  handleChange(ev: React.FormEvent<HTMLElement>) {
    ev;
  }

  render() {
    const className = `closed${this.props.size}`;
    return (
      <button
        className={className}
        onClick={this.props.handleClick} />
    );
  }
}
