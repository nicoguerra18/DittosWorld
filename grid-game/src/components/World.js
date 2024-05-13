import Landscape from "./Landscape";
import React from "react";
import Player from "./Player";

function World() {
  return (
    <div className="world">
      <Landscape />
      <Player />
    </div>
  );
}

export default World;
