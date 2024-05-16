import React, { useState } from "react";

function CatchPokemon({ pokemon }) {
  // pass in player image
  // pass in pokemon

  return (
    <>
      {" "}
      <img
        alt={pokemon.name}
        className="pokemon"
        style={{
          position: "absolute",
          top: "40vh",
          left: "60vw",

          width: "19vw",
          height: "25vh",
        }}
        src={pokemon.sprites.front_default}
      />
    </>
  );
}

export default CatchPokemon;
