import { frogNE, frogNW, frogSW, frogSE } from "../images";
import React, { useEffect } from "react";
import { atom, useRecoilValue, useRecoilState } from "recoil";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";
import Landscape from "./Landscape";

function Player() {
  const playerState = atom({
    key: "playerState",
    default: { x: 4, y: 8, dir: "up", dead: false },
  });
  const [player, setPlayer] = useRecoilState(playerState);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            y: Math.max(prevPlayer.y - 1, 0),
            dir: "up",
          }));
          break;
        case "ArrowDown":
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            y: Math.min(prevPlayer.y + 1, WORLD_SIZE + 5 - 1),
            dir: "down",
          }));
          break;
        case "ArrowLeft":
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            x: Math.max(prevPlayer.x - 1, 0),
            dir: "left",
          }));
          break;
        case "ArrowRight":
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            x: Math.min(prevPlayer.x + 1, WORLD_SIZE + 5 - 1),
            dir: "right",
          }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setPlayer]);

  // Calc abs position
  const yOffset = ((100 / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
  const yBase = yOffset * player.y + yOffset / 1.8;
  const xBase = 50 - (100 / 18) * player.y;
  const xAbs = xBase + (50 / 9) * player.x;
  const yAbs = yBase + yOffset * player.x;

  // Get corrrect image from direction
  let src;

  if (player.dir === "up") {
    src = frogNE;
  } else if (player.dir === "down") {
    src = frogSW;
  } else if (player.dir === "left") {
    src = frogNW;
  } else if (player.dir === "right") {
    src = frogSE;
  }
  return (
    <>
      <img
        alt="frog"
        className={`frog ${player.dead && "dead"}`}
        style={{ top: `${yAbs}%`, left: `${xAbs}%` }}
        src={src}
      />
    </>
  );
}

export default Player;
