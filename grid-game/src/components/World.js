import Landscape from "./Landscape";
import React from "react";
import Player from "./Player";

function World({ selectedPokemon }) {
  return (
    <div className="world">
      {console.log(selectedPokemon)}
      <Landscape />
      <Player selectedPokemon={selectedPokemon} />
    </div>
  );
}



export default World;
