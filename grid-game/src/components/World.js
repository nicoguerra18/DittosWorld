import React, { useEffect, useState } from "react";
import Landscape from "./Landscape";
import Player from "./Player";
import Berry from "./Berry";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";


function World({ selectedPokemon }) {
  const [berries, setBerries] = useState({});
  const [berryCount, setBerryCount] = useState(0);

  // Generate berries useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Object.keys(berries).length < 5) {
        // Generate random coordinates for the new berry
        const x = Math.floor(Math.random() * WORLD_SIZE);
        const y = Math.floor(Math.random() * WORLD_SIZE);
        const newPosition = `${x},${y}`;

        // Ensure the new berry position is unique
        if (!(newPosition in berries)) {
          setBerries((prevBerries) => ({
            ...prevBerries,
            [newPosition]: { x, y },
          }));
        }
      }
    }, 5000); // Adjust the interval time as needed (in milliseconds)

    return () => {
      clearInterval(intervalId);
    };
  }, [berries]);

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

  return (
    <div className="world">
      <Landscape />
      <h3> Berries: {berryCount}</h3>
      <Player selectedPokemon={selectedPokemon} onMove={checkBerryCollision} />
      {Object.entries(berries).map(
        ([position, berry]) =>
          berry && <Berry key={position} x={berry.x} y={berry.y} />
      )}
    </div>
  );
}

export default World;