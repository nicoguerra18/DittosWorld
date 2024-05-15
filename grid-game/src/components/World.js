import React, { useState } from "react";
import Landscape from "./Landscape";
import Player from "./Player";
import Berry from "./Berry";
import StaticObjects from "./StaticObjects";
import Pokeball from "./Pokeball";

function World({ selectedPokemon }) {
  const [berries, setBerries] = useState({});
  const [berryCount, setBerryCount] = useState(0);
  const [pokeballs, setPokeballs] = useState({});
  const [pokeballCount, setPokeballCount] = useState(0);

  StaticObjects(berries, setBerries, 5000, 5); // Generate berries
  StaticObjects(pokeballs, setPokeballs, 5000, 5); // Generate pokeballs

  const checkBerryCollision = (playerX, playerY) => {
    const playerPosition = `${playerX},${playerY}`;
    if (playerPosition in berries) {
      // Remove the berry from the list of berries
      setBerries((prevBerries) => {
        const updatedBerries = { ...prevBerries };
        delete updatedBerries[playerPosition];
        return updatedBerries;
      });
      // increase the player's score when they catch a berry
      setBerryCount((prevCount) => prevCount + 1);
    }
  };

  const checkPokeballCollision = (playerX, playerY) => {
    const playerPosition = `${playerX},${playerY}`;
    if (playerPosition in pokeballs) {
      // Remove the berry from the list of berries
      setPokeballs((prevPokeballs) => {
        const updatedPokeballs = { ...prevPokeballs };
        delete updatedPokeballs[playerPosition];
        return updatedPokeballs;
      });
      // increase the player's score when they catch a berry
      setPokeballCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <div className="world">
      <Landscape />
      <h3> Berries: {berryCount}</h3>
      <h3> Pokeballs: {pokeballCount}</h3>
      <Player
        selectedPokemon={selectedPokemon}
        onMove1={checkBerryCollision}
        onMove2={checkPokeballCollision}
      />
      {Object.entries(berries).map(
        ([position, berry]) =>
          berry && <Berry key={position} x={berry.x} y={berry.y} />
      )}
      {Object.entries(pokeballs).map(
        ([position, pokeball]) =>
          pokeball && <Pokeball key={position} x={pokeball.x} y={pokeball.y} />
      )}
    </div>
  );
}

export default World;
