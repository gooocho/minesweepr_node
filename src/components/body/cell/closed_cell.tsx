import React from "react";

const ClosedCell: React.FC<{
  size: number;
  open: (ev: React.MouseEvent<HTMLElement>) => void;
}> = ({ size, open }) => {
  return <button className={`closed${size}`} onClick={open} />;
};

export { ClosedCell };
