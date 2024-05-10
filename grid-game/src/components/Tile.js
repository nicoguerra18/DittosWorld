import React from "react";

function Tile({ src, x, y, z }) {
  return (
    <img
      src={src}
      className="tile"
      style={{ left: `${x}%`, top: `${y}%`, zIndex: z }}
    />
  );
}

export default Tile;
