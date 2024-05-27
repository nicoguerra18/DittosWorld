import React from "react";
import {
  grass,
  road,
  roadGrassAbove,
  roadGrassBelow,
  water,
  waterGrassAbove,
  waterGrassBelow,
} from "../images";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";
import Tile from "./Tile";

const yOffset = ((100 / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
const tiles = [];

const extendedSize = WORLD_SIZE + 11;

for (let i = extendedSize; i > 0; i--) {
  tiles.push(Array(extendedSize).fill("grass"));
}

function Landscape() {
  return (
    <div>
      {tiles.map((row, y) => {
        const yBase = yOffset * y;
        const xBase = 110 - (100 / 18) * y;

        return row.map((tile, x) => {
          const z = x + 100;
          const xAbs = xBase + (110 / 20) * x;
          const yAbs = yBase + yOffset * x;
          let src;
          if (tile === "grass") {
            src = grass;
          } else if (tile === "road") {
            src = road;
          } else if (tile === "water") {
            src = water;
          } else if (tile === "roadGrassAbove") {
            src = roadGrassAbove;
          } else if (tile === "roadGrassBelow") {
            src = roadGrassBelow;
          } else if (tile === "waterGrassAbove") {
            src = waterGrassAbove;
          } else if (tile === "waterGrassBelow") {
            src = waterGrassBelow;
          }

          return <Tile key={`${x}${y}`} src={src} x={xAbs} y={yAbs} z={z} />;
        });
      })}
    </div>
  );
}
export default React.memo(Landscape);
