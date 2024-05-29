import { dpokeball } from "../images";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";

function Pokeball({ x, y }) {
  const yOffset = ((100 / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
  const yBase = yOffset * y + yOffset / 1.5;
  const xBase = 110 - (100 / 18) * y;
  const xAbs = xBase + (110 / 20) * x;
  const yAbs = yBase + yOffset * x;

  return (
    <>
      <img
        alt="berry"
        className="pokeball"
        style={{
          top: `${yAbs}%`,
          left: `${xAbs}%`,
          opacity: x < 0 || x > 30 ? 0 : 1,
        }}
        src={dpokeball}
      />
    </>
  );
}

export default Pokeball;
