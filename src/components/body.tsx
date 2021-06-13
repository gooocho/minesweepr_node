import React from "react";
import { MineMap } from "../game/sized_map/mine_map";

export function Body(props: {mineMap: MineMap}) {
  return (
    <div>
      here is Body
      <pre>
        {props.mineMap.print()}
      </pre>
    </div>
  );
}
