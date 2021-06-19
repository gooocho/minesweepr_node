import React from "react";
import { MenuInput } from "./menu_input";

type PropsType = {handleStart: (width: number, height: number, mineCount: number) => void};
type StateType = {width : number, height: number, mineCount: number};

export class Menu extends React.Component<PropsType, StateType> {
  static DEFAULT_WIDTH = 9;
  static DEFAULT_HEIGHT = 9;
  static DEFAULT_MINECOUNT = 10;

  constructor(props: PropsType) {
    super(props);
    this.state = {
      width: Menu.DEFAULT_WIDTH,
      height: Menu.DEFAULT_HEIGHT,
      mineCount: Menu.DEFAULT_MINECOUNT
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(state_name: string, value: number) {
    switch(state_name) {
      case 'width':
      case 'height':
      case 'mineCount':
        this.setState({
          ...this.state,
          [state_name]: value
        });
        break;
      default:
        // noop
    }
  }

  render() {
    return (
      <div>
        <div>
          <p>
            size:
            <MenuInput
              name="width"
              defaultValue={Menu.DEFAULT_WIDTH}
              handleChange={this.handleChange} />
            *
            <MenuInput
              name="height"
              defaultValue={Menu.DEFAULT_HEIGHT}
              handleChange={this.handleChange} />
          </p>
          <p>
            mine:
            <MenuInput
              name="mine_count"
              defaultValue={Menu.DEFAULT_MINECOUNT}
              handleChange={this.handleChange} />
          </p>
        </div>
        <button onClick={() => this.props.handleStart(
          this.state.width,
          this.state.height,
          this.state.mineCount
        )}>start</button>
      </div>
    );
  }
}
