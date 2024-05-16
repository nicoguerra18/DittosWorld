import React, { useEffect, useState } from "react";
import Landscape from "./Landscape";
import Player from "./Player";
import Berry from "./Berry";
import StaticObjects from "./StaticObjects";
import Pokeball from "./Pokeball";
import Pokedex from "./Pokedex";
import { pokeball } from "../images";
import WildPokemon from "./WildPokemon";
import { WORLD_SIZE } from "../constants";
import axios from "axios"; // Don't forget to import axios
import CatchPokemon from "./CatchPokemon";

function World({ selectedPokemon }) {
  const [berries, setBerries] = useState({});
  const [berryCount, setBerryCount] = useState(0);
  const [pokeballs, setPokeballs] = useState({});
  const [pokeballCount, setPokeballCount] = useState(0);
  const [myPokemonList, setMyPokemonList] = useState({});
  const [wildPokemon, setWildPokemon] = useState({});
  const [modalOpen, setModalOpen] = useState(false); // Open Catch Pokemon modal
  const [encounteredPokemon, setEncounteredPokemon] = useState();

  StaticObjects(berries, setBerries, 5000, 5); // Generate berries
  StaticObjects(pokeballs, setPokeballs, 5000, 5); // Generate pokeballs

  // 1. create WildPokemon Object API call store it in wildPokemon with x,y as Key
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Execute only when wildPokemon length is less than 5
      if (Object.keys(wildPokemon).length < 5) {
        const x = Math.floor(Math.random() * WORLD_SIZE);
        const y = Math.floor(Math.random() * WORLD_SIZE);
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

  const checkBerryCollision = (playerX, playerY) => {
    const playerPosition = `${playerX},${playerY}`;
    if (playerPosition in berries) {
      // Remove the berry from the list of berries
      setTimeout(() => {
        setBerries((prevBerries) => {
          const updatedBerries = { ...prevBerries };
          delete updatedBerries[playerPosition];
          return updatedBerries;
        });
        // increase the player's score when they catch a berry
        setBerryCount((prevCount) => prevCount + 1);
      }, 350); // Adjust the delay time as needed (in milliseconds)
    }
  };

  const checkPokeballCollision = (playerX, playerY) => {
    const playerPosition = `${playerX},${playerY}`;
    if (playerPosition in pokeballs) {
      // Remove the berry from the list of berries

      // Add a slight delay before picking up pokeball
      setTimeout(() => {
        setPokeballs((prevPokeballs) => {
          const updatedPokeballs = { ...prevPokeballs };
          delete updatedPokeballs[playerPosition];
          return updatedPokeballs;
        });
        // increase the player's score when they catch a berry
        setPokeballCount((prevCount) => prevCount + 1);
      }, 350); // Adjust the delay time as needed (in milliseconds)
    }
  };

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

        // Add the captured Pokemon to myPokemonList
        setMyPokemonList((prevList) => {
          return { ...prevList, [pokemon.id]: pokemon };
        });
      }, 350); // Adjust the delay time as needed (in milliseconds)
    }
  };
  return (
    <>
      <NavBar
        myPokemonList={myPokemonList}
        pokeballCount={pokeballCount}
        berryCount={berryCount}
      />
      <div className="world">
        <Landscape />
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
      />
      <CatchPokemonModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        pokemon={encounteredPokemon}
      />
    </>
  );
}

function Logo() {
  return (
    <div className="logo">
      <img
        src={pokeball}
        style={{ width: "35px", height: "35px", marginRight: "10px" }}
      />
      <div className="title">Pokemon Game</div>
      <img
        src={pokeball}
        style={{ width: "35px", height: "35px", marginRight: "10px" }}
      />
    </div>
  );
}

function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
    </nav>
  );
}

function CatchPokemonModal({ modalOpen, setModalOpen, pokemon }) {
  return (
    <div className="modal" style={{ display: modalOpen ? "block" : "none" }}>
      <div className="modal-content">
        <span className="close" onClick={() => setModalOpen(false)}>
          Leave
        </span>
        <div className="modal-body">
          {pokemon && <CatchPokemon pokemon={pokemon} />}
        </div>
      </div>
    </div>
  );
}

export default World;
