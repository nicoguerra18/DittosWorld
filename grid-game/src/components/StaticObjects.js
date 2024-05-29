import { useEffect } from "react";
import { WORLD_SIZE } from "../constants";

const StaticObjects = (objects, setObjects, interval, maxCount) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Object.keys(objects).length < maxCount) {
        // Generate random coordinates for the new berry
        const x = Math.floor(Math.random() * (WORLD_SIZE + 21));
        const y = Math.floor(Math.random() * (WORLD_SIZE + 21));
        const newPosition = `${x},${y}`;

        // Berries and Pokeballs
        if (!(newPosition in objects)) {
          setObjects((prevObjects) => ({
            ...prevObjects,
            [newPosition]: { x, y },
          }));
        }
      }
    }, interval); // Adjust the interval time as needed (in milliseconds)

    return () => {
      clearInterval(intervalId);
    };
  }, [objects, setObjects, interval, maxCount]);
};

export default StaticObjects;
