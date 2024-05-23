import React, { useState, useEffect, useRef } from "react";
import { dpokeball } from "../images";

function CatchPokemon({
  pokemon,
  player,
  pokeballCount,
  setPokeballCount,
  setMyPokemonList,
  setCaughtFlag,
  caughtFlag,
}) {
  const [pokeballThrown, setPokeballThrown] = useState(false);
  const [pokeballPosition, setPokeballPosition] = useState({
    left: 0,
    top: 0,
  });
  const [showCaughtMessage, setShowCaughtMessage] = useState(false); // New state for caught message

  useEffect(() => {
    // Reset the caught message when caughtFlag changes
    setShowCaughtMessage(false);
  }, [caughtFlag]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();
      if (event.code === "Space") {
        // Throw Pokeball when spacebar is pressed
        if (
          pokeballCount > 0 &&
          pokeballThrown === false &&
          caughtFlag === false
        ) {
          // Logic to catch a pokemon and add to myPokemonList
          let x = Math.random();
          if (x > 0.5) {
            // Remove from WildPokemon List
            // Add the captured Pokemon to myPokemonList
            setMyPokemonList((prevList) => {
              return { ...prevList, [pokemon.id]: pokemon };
            });
            setCaughtFlag(true);
          } else {
            // did not catch pokemon
            console.log("failed to catch pokemon");
          }
          // Decrease Count and set Pokeball thrown to true
          setPokeballCount((prevCount) => prevCount - 1); // Decrease pokeball count
          setPokeballThrown(true);
        } else {
          console.log("You have no more pokeballs / you cant throw");
        }
      }
    };
    // Add event listener for spacebar press
    window.addEventListener("keydown", handleKeyPress);
    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [pokeballCount, pokeballThrown, caughtFlag]);

  useEffect(() => {
    if (pokeballThrown) {
      animate();

      // Set a new timeout to reset pokeballThrown
      setTimeout(() => {
        setPokeballThrown(false);
        setShowCaughtMessage(true); // Show caught message after animation ends
      }, 2400); // Reset pokeballThrown after 1 second
    } else {
      console.log("thrown but pokeballThrown is still true");
    }
  }, [pokeballThrown]);

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
      }
    };
    animate();
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
      {showCaughtMessage && ( // Only show the message when showCaughtMessage is true
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          {caughtFlag
            ? `You caught ${pokemon.name}!`
            : `You failed to catch ${pokemon.name}.`}
        </div>
      )}
    </>
  );
}

export default CatchPokemon;
