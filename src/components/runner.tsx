import React from "react";
import { Menu } from "./menu";
import { Body } from "./body";
import { LocalRunner } from "../game/runner/local_runner";

const localRunner1 = LocalRunner.newGame(9, 9, 10, [0, 0, 0, 0]);

export function Runner() {
  return (
    <div>
      <Menu />
      <hr />
      <Body mineMap={localRunner1.mineMap} />
    </div>
  );
}
