import React, { useState, useEffect } from "react";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";

function WildPokemon({ x, y, pokemonData }) {
  const yOffset = ((100 / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
  const yBase = yOffset * y + yOffset / 1.5;
  const xBase = 110 - (100 / 18) * y;
  const xAbs = xBase + (110 / 20) * x;
  const yAbs = yBase + yOffset * x;

  return (
    <>
      {
        <img
          alt={pokemonData.name}
          className="pokemon"
          style={{
            top: `${yAbs}%`,
            left: `${xAbs}%`,
            opacity: x < 0 || x > 20 ? 0 : 1,
          }}
          src={pokemonData.sprites.front_default}
        />
      }
    </>
  );
}

export default WildPokemon;
