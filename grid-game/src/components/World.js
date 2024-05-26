import React, { useEffect, useState } from "react";
import Landscape from "./Landscape";
import Player from "./Player";
import Berry from "./Berry";
import StaticObjects from "./StaticObjects";
import Pokeball from "./Pokeball";
import Pokedex from "./Pokedex";
import { dpokeball } from "../images";
import WildPokemon from "./WildPokemon";
import { WORLD_SIZE } from "../constants";
import axios from "axios"; // Don't forget to import axios
import CatchPokemon from "./CatchPokemon";
import { scrollToPlayer } from "./ScrollToPlayer";

function World({ setSelectedPokemon, selectedPokemon, playerName }) {
  const [berries, setBerries] = useState({});
  const [berryCount, setBerryCount] = useState(0);
  const [pokeballs, setPokeballs] = useState({});
  const [pokeballCount, setPokeballCount] = useState(0);
  const [myPokemonList, setMyPokemonList] = useState({});
  const [wildPokemon, setWildPokemon] = useState({});
  const [modalOpen, setModalOpen] = useState(false); // Open Catch Pokemon modal
  const [encounteredPokemon, setEncounteredPokemon] = useState();
  const [hpEnhance, setHpEnhance] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isTransforming, setIsTransforming] = useState(false);

  StaticObjects(berries, setBerries, 2000, 10); // Generate berries
  StaticObjects(pokeballs, setPokeballs, 2000, 10); // Generate pokeballs

  // function to trigger ZOOM in and transformation
  const triggerTransformation = () => {
    // Get the player element and its position
    const playerElement = document.querySelector(".player");
    const worldElement = document.querySelector(".world");

    if (!playerElement || !worldElement) return;

    const playerRect = playerElement.getBoundingClientRect();
    const worldRect = worldElement.getBoundingClientRect();

    // Calculate the transform-origin values as a percentage of the world element's dimensions
    const x =
      ((playerRect.left + playerRect.width / 2 - worldRect.left) /
        worldRect.width) *
      100;
    const y =
      ((playerRect.top + playerRect.height / 2 - worldRect.top) /
        worldRect.height) *
      100;

    // Set the CSS variables for transform-origin
    worldElement.style.setProperty("--x", `${x}%`);
    worldElement.style.setProperty("--y", `${y}%`);

    // Add the zoomed class to trigger the transformation
    setIsTransforming(true);

    // Set a timeout to remove the zoomed class and toggle isTransforming back to false after 5 seconds
    setTimeout(() => {
      setIsTransforming(false);
    }, 5000);
  };

  // 1. create WildPokemon Object API call store it in wildPokemon with x,y as Key
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Execute only when wildPokemon length is less than 5
      if (Object.keys(wildPokemon).length < 5) {
        const x = Math.floor(Math.random() * (WORLD_SIZE + 11));
        const y = Math.floor(Math.random() * (WORLD_SIZE + 11));
        const fetchPokemon = async () => {
          try {
            const randomID = Math.floor(Math.random() * 1302) + 1;
            const url = `https://pokeapi.co/api/v2/pokemon/${randomID}`;
            const res = await axios.get(url);
            const pokemon = res.data;
            setWildPokemon((prevWildPokemon) => ({
              ...prevWildPokemon,
              [`${x},${y}`]: pokemon,
            }));
          } catch (e) {
            console.log(e);
          }
        };
        fetchPokemon();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [wildPokemon]);

  // Handle spacebar to hide instructions and start the game
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (showInstructions && event.key === " ") {
        event.preventDefault(); // Prevent default spacebar behavior
        setShowInstructions(false);
        scrollToPlayer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // debouncing
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const checkBerryCollision = debounce((playerX, playerY) => {
    const playerPosition = `${playerX},${playerY}`;
    if (playerPosition in berries) {
      // Remove the berry from the list of berries
      setBerries((prevBerries) => {
        const updatedBerries = { ...prevBerries };
        delete updatedBerries[playerPosition];
        return updatedBerries;
      });
      // Increase the player's score when they catch a berry
      setBerryCount((prevCount) => prevCount + 1);
    }
  }, 310);

  const checkPokeballCollision = debounce((playerX, playerY) => {
    const playerPosition = `${playerX},${playerY}`;
    if (playerPosition in pokeballs) {
      // Remove the berry from the list of berries

      // Add a slight delay before picking up pokeball
      setPokeballs((prevPokeballs) => {
        const updatedPokeballs = { ...prevPokeballs };
        delete updatedPokeballs[playerPosition];
        return updatedPokeballs;
      });
      // increase the player's score when they catch a berry
      console.log("collision");
      setPokeballCount((prevCount) => prevCount + 1);
    }
  }, 310);

  // Catch Pokemon (for now just catch it by moving on it)
  const checkPokemonCollision = (playerX, playerY) => {
    const playerPosition = `${playerX},${playerY}`;
    if (playerPosition in wildPokemon) {
      // Get the wild Pokemon object
      // Add a slight delay before picking up pokeball
      setTimeout(() => {
        const pokemon = wildPokemon[playerPosition];
        setEncounteredPokemon(pokemon);
        setModalOpen(true);

        // Remove the wild Pokemon from the list of wild Pokemon
        setWildPokemon((prevPokemon) => {
          const updatedPokemon = { ...prevPokemon };
          delete updatedPokemon[playerPosition];
          return updatedPokemon;
        });
      }, 350); // Adjust the delay time as needed (in milliseconds)
    }
  };

  return (
    <>
      {showInstructions && (
        <div className="instruction-card">
          <h2>Welcome {playerName}!</h2>
          <p>Use the arrow keys to move your player.</p>
          <p>Press the spacebar to start playing.</p>
        </div>
      )}
      <NavBar
        playerName={playerName}
        selectedPokemon={selectedPokemon}
        hpEnhance={hpEnhance}
      />

      <div className={`world ${isTransforming ? "zoomed" : ""}`}>
        <Landscape className="landscape" />

        <Player
          selectedPokemon={selectedPokemon}
          onMove1={checkBerryCollision}
          onMove2={checkPokeballCollision}
          onMove3={checkPokemonCollision}
        />
        {Object.entries(berries).map(
          ([position, berry]) =>
            berry && <Berry key={position} x={berry.x} y={berry.y} />
        )}
        {Object.entries(pokeballs).map(
          ([position, pokeball]) =>
            pokeball && (
              <Pokeball key={position} x={pokeball.x} y={pokeball.y} />
            )
        )}
        {Object.entries(wildPokemon).map(([position, pokemon]) => (
          <WildPokemon
            key={position}
            x={parseInt(position.split(",")[0])}
            y={parseInt(position.split(",")[1])}
            pokemonData={pokemon}
          />
        ))}
      </div>

      <Pokedex
        myPokemonList={myPokemonList}
        pokeballCount={pokeballCount}
        berryCount={berryCount}
        setSelectedPokemon={setSelectedPokemon}
        setHpEnhance={setHpEnhance}
        selectedPokemon={selectedPokemon}
        hpEnhance={hpEnhance}
        setBerryCount={setBerryCount}
        triggerTransformation={triggerTransformation}
      />
      <CatchPokemonModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        pokemon={encounteredPokemon}
        player={selectedPokemon}
        pokeballCount={pokeballCount}
        setPokeballCount={setPokeballCount}
        setMyPokemonList={setMyPokemonList}
      />
    </>
  );
}

function Logo({ playerName, selectedPokemon, hpEnhance }) {
  // Ensure selectedPokemon is loaded before accessing its properties
  if (!selectedPokemon || !selectedPokemon.stats) {
    return null; // or return a loading indicator
  }

  // Find the HP stat
  const hpStat = selectedPokemon.stats.find((stat) => stat.stat.name === "hp");
  const currentHp = hpStat.base_stat + hpEnhance;

  return (
    <div
      className="logo"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "right",
      }}
    >
      <div>
        <img
          src={selectedPokemon.sprites["front_default"]}
          alt={selectedPokemon.name}
          style={{ width: "100px", height: "100px", marginBottom: "-10px" }}
        />
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-heart-fill"
          viewBox="0 0 16 16"
          style={{ marginTop: "4" }}
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
          />
        </svg>
      </div>
      <h2 className="main-title">{currentHp} HP</h2>
    </div>
  );
}

function NavBar({ playerName, selectedPokemon, hpEnhance }) {
  return (
    <nav className="nav-bar">
      <div>
        <Logo selectedPokemon={selectedPokemon} hpEnhance={hpEnhance} />
      </div>
    </nav>
  );
}

function CatchPokemonModal({
  modalOpen,
  setModalOpen,
  pokemon,
  player,
  pokeballCount,
  setPokeballCount,
  setMyPokemonList,
}) {
  const [caughtFlag, setCaughtFlag] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      // Reset caughtFlag to false when the modal opens
      setCaughtFlag(false);
    }
  }, [modalOpen]); // Run this effect whenever modalOpen changes

  useEffect(() => {
    if (caughtFlag) {
      const timer = setTimeout(() => {
        setModalOpen(false);
      }, 5000); // Delay of 2000ms or 2 seconds

      return () => clearTimeout(timer); // Cleanup the timeout if component unmounts
    }
  }, [caughtFlag, setModalOpen]);

  return (
    <div className="modal" style={{ display: modalOpen ? "block" : "none" }}>
      <div className="modal-content">
        <span className="close" onClick={() => setModalOpen(false)}>
          Leave
        </span>
        <div className="modal-body">
          {pokemon && (
            <CatchPokemon
              pokemon={pokemon}
              player={player}
              pokeballCount={pokeballCount}
              setPokeballCount={setPokeballCount}
              setMyPokemonList={setMyPokemonList}
              setCaughtFlag={setCaughtFlag}
              caughtFlag={caughtFlag}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default World;
