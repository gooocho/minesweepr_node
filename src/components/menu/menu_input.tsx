import React from "react";

type PropsType = {
  name: string;
  defaultValue: number;
  handleChange: (name: string, value: number) => void;
};
type StateType = {};

export class MenuInput extends React.Component<PropsType, StateType> {
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;

  constructor(props: PropsType) {
    super(props);
    this.handleChange = ((ev: React.ChangeEvent<HTMLInputElement>) => {
      this.props.handleChange(this.props.name, Number(ev.target.value));
    }).bind(this);
  }

  render() {
    return (
      <input
        name={this.props.name}
        type="number"
        defaultValue={this.props.defaultValue}
        onChange={this.handleChange}
      />
    );
  }
}
