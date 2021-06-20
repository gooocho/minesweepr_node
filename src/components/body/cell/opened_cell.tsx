import React from "react";

const OpenedCell: React.FC<{
  size: number;
  number: number;
}> = ({ size, number }) => {
  return <div className={`opened${size}`}>{number}</div>;
};

export { OpenedCell };
