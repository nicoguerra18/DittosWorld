import React, { useEffect, useState } from "react";
import Landscape from "./Landscape";
import Player from "./Player";
import Berry from "./Berry";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";

function World({ selectedPokemon }) {
  const [berries, setBerries] = useState({});
  const [berryCount, setBerryCount] = useState(0);

  // generate berries useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate random coordinates for the new berry
      const x = Math.floor(Math.random() * WORLD_SIZE);
      const y = Math.floor(Math.random() * WORLD_SIZE);

      // Add the new berry to the list of berries
      if (Object.keys(berries).length < 5) {
        setBerries((prevBerries) => {
          // Ensure the new berry position is unique
          const newPosition = `${x},${y}`;
          if (!(newPosition in prevBerries)) {
            return { ...prevBerries, [newPosition]: { x, y } };
          }
          return { ...prevBerries };
        });
      }
    }, 5000); // Adjust the interval time as needed (in milliseconds)

    return () => {
      clearInterval(intervalId);
    };
  }, [berries]); // Add berries as a dependency to ensure useEffect is called whenever berries change

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
      <h3># of Berries: {berryCount}</h3>
      <Player selectedPokemon={selectedPokemon} onMove={checkBerryCollision} />
      {Object.values(berries).map((berry, index) => (
        <Berry key={index} x={berry.x} y={berry.y} />
      ))}
    </div>
  );
}

export default World;
