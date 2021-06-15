import React from "react";
import { Menu } from "./menu";
import { Body } from "./body";
import { LocalGame } from "../game/runner/local_game";

const localRunner1 = LocalGame.newGame(9, 9, 10, [0, 0, 0, 0]);

export class Runner extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Menu />
        <hr />
        <Body localRunner={localRunner1} />
      </div>
    );
  }
}
