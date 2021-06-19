import React from "react";

export class OpenedCell extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {value: props.number};
  }

  render() {
    const className = `opened${this.props.size}`;
    return (
      <div className={className}>{this.props.number}</div>
    );
  }
}
