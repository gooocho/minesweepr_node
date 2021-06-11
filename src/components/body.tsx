import React from "react";
import { Field } from "../game/field";

const field = Field.newField(3, 3, 3);

export function Body() {
  return (
    <div>
      here is gameBody
      <pre>
        {field.print()}
      </pre>
    </div>
  );
}
