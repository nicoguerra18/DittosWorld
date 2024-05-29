import React, { useEffect, useState } from "react";
import { atom, useRecoilValue, useRecoilState } from "recoil";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";
import { scrollToPlayer } from "./ScrollToPlayer";

const playerState = atom({
  key: "playerState",
  default: { x: 25, y: 28, dir: "down", dead: false },
});

function Player({ selectedPokemon, onMove1, onMove2, onMove3 }) {
  const [player, setPlayer] = useRecoilState(playerState);
  const [canMove, setCanMove] = useState(true);

  const pokemonSprites = {
    front: selectedPokemon.sprites["front_default"],
    back: selectedPokemon.sprites["back_default"],
    left: selectedPokemon.sprites["back_default"],
    right: selectedPokemon.sprites["front_default"],
  };

  // Trigger the onMove function with the updated player position
  onMove1(player.x, player.y);
  onMove2(player.x, player.y);
  onMove3(player.x, player.y);

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault(); // Prevent the default behavior of arrow keys (scrolling)
      if (!canMove) return; // If cannot move, ignore key press

      switch (event.key) {
        case "ArrowUp":
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            y: Math.max(prevPlayer.y - 1, 0),
            dir: "up",
          }));
          // window.scrollBy({ top: -40, left: 40, behavior: "smooth" }); // Scroll up
          break;
        case "ArrowDown":
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            y: Math.min(prevPlayer.y + 1, WORLD_SIZE + 21 - 1),
            dir: "down",
          }));
          //window.scrollBy({ top: 40, left: -40, behavior: "smooth" }); // Scroll
          break;
        case "ArrowLeft":
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            x: Math.max(prevPlayer.x - 1, 0),
            dir: "left",
          }));
          //window.scrollBy({ left: -80, top: -40, behavior: "smooth" }); // Scroll left
          break;
        case "ArrowRight":
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            x: Math.min(prevPlayer.x + 1, WORLD_SIZE + 21 - 1),
            dir: "right",
          }));
          //window.scrollBy({ left: 80, top: 40, behavior: "smooth" }); // Scroll right
          break;
        default:
          break;
      }
      scrollToPlayer();

      // Disable movement for a short duration after each key press
      setCanMove(false);
      setTimeout(() => {
        setCanMove(true);
      }, 350); // Adjust the delay time as needed (in milliseconds)
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setPlayer, canMove, onMove1, onMove2, player.x, player.y]);

  // Calc abs position
  const yOffset = ((100 / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
  const yBase = yOffset * player.y + yOffset / 1.8;
  const xBase = 110 - (100 / 18) * player.y;
  const xAbs = xBase + (50 / 9) * player.x;
  const yAbs = yBase + yOffset * player.x;

  // Get correct image from direction
  // Get correct image from direction
  let src;
  let directionClass = "";

  switch (player.dir) {
    case "up":
      src = pokemonSprites.back;
      break;
    case "down":
      src = pokemonSprites.front;
      break;
    case "left":
      src = pokemonSprites.left;
      directionClass = "left";
      break;
    case "right":
      src = pokemonSprites.right;
      directionClass = "left";
      break;

    default:
      break;
  }

  return (
    <>
      <img
        alt="no sprite for this dir"
        className={`player ${player.dead ? "dead" : ""} ${directionClass}`}
        style={{
          position: "absolute",
          top: `${yAbs}%`,
          left: `${xAbs}%`,
        }}
        src={src}
      />
    </>
  );
}

export default Player;
