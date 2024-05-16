import React, { useState, useEffect } from "react";
import { dpokeball } from "../images";

function CatchPokemon({ pokemon, player }) {
  const [pokeballThrown, setPokeballThrown] = useState(false);
  const [pokemonCaught, setPokemonCaught] = useState(false);
  const [pokeballPosition, setPokeballPosition] = useState({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    // Add event listener for spacebar press
    window.addEventListener("keydown", handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (pokeballThrown) {
      animate();
    }
  }, [pokeballThrown]);

  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      // Throw Pokeball when spacebar is pressed
      setPokeballThrown(true);
    }
  };

  const animate = () => {
    const startPosition = {
      left: window.innerWidth * 0.3,
      top: window.innerHeight * 0.5,
    }; // Initial position of the pokeball (bottom left corner)
    const endPosition = {
      left: window.innerWidth * 0.8,
      top: window.innerHeight * 0.2,
    }; // Position of the center of the viewport

    const speed = 4; // Adjust speed as needed
    let currentLeft = startPosition.left;
    let currentTop = startPosition.top;

    const animate = () => {
      if (currentLeft < endPosition.left) {
        currentLeft += speed; // Increase left position to move right
      }
      if (currentTop > endPosition.top) {
        currentTop -= speed; // Decrease top position to move up
      }

      setPokeballPosition({ left: currentLeft, top: currentTop });

      if (currentLeft < endPosition.left || currentTop > endPosition.top) {
        requestAnimationFrame(animate);
      } else {
        setPokemonCaught(true);
      }
    };

    animate();

    setTimeout(() => {
      setPokeballThrown(false);
    }, 2400); // Reset pokeballThrown after 5 seconds
  };

  return (
    <>
      <div
        className="wildName"
        style={{
          position: "absolute",
          top: "9vh",
          left: "60vw",
        }}
      >
        {pokemon.name}
      </div>
      <img
        alt={pokemon.name}
        className="pokemon"
        style={{
          position: "absolute",
          top: "40vh",
          left: "67vw",
          width: "350px",
          height: "350px",
        }}
        src={pokemon.sprites.front_default}
      />
      <img
        alt={player.name}
        className="pokemon"
        style={{
          position: "absolute",
          top: "70vh",
          left: "30vw",
          width: "400px",
          height: "400px",
        }}
        src={player.sprites.back_default}
      />
      {pokeballThrown && (
        <img
          alt="pokeball"
          src={dpokeball}
          className="battleball"
          style={{
            position: "absolute",
            top: pokeballPosition.top + "px",
            left: pokeballPosition.left + "px",
            width: "70px",
            height: "70px",
          }}
        />
      )}
    </>
  );
}

export default CatchPokemon;
