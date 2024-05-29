import React, { useEffect, useState } from "react";
import Landscape from "./Landscape";
import Player from "./Player";
import Berry from "./Berry";
import StaticObjects from "./StaticObjects";
import Pokeball from "./Pokeball";
import Pokedex from "./Pokedex";
import WildPokemon from "./WildPokemon";
import { WORLD_SIZE } from "../constants";
import axios from "axios"; // Don't forget to import axios
import CatchPokemonModal from "./CatchPokemonModal";
import { scrollToPlayer } from "./ScrollToPlayer";
import LevelCard from "./LevelCard";
import NavBar from "./NavBar";
import SettingCard from "./SettingCard";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

// Level Requirements
const levelRequirements = [
  { level: 1, catchPokemon: 2, collectPokeballs: 2, collectBerries: 2 },
  { level: 2, catchPokemon: 5, collectPokeballs: 5, collectBerries: 10 },
  { level: 3, catchPokemon: 7, collectPokeballs: 5, collectBerries: 5 },
  { level: 4, catchPokemon: 10, collectPokeballs: 5, collectBerries: 10 },
  { level: 5, catchPokemon: 15, collectPokeballs: 10, collectBerries: 7 },
  { level: 6, catchPokemon: 5, collectPokeballs: 10, collectBerries: 20 },
  { level: 7, catchPokemon: 50, collectPokeballs: 10, collectBerries: 15 },
  // Add more levels as needed
];

function World({
  setSelectedPokemon,
  selectedPokemon,
  playerName,
  myPokemonList,
  setMyPokemonList,
}) {
  const [berries, setBerries] = useLocalStorageState({}, "berries");
  const [berryCount, setBerryCount] = useLocalStorageState(0, "berryCount");
  const [pokeballs, setPokeballs] = useLocalStorageState({}, "pokeballs");
  const [pokeballCount, setPokeballCount] = useLocalStorageState(0, "pokeballCount");
  const [wildPokemon, setWildPokemon] = useLocalStorageState({}, "wildPokemon");
  const [modalOpen, setModalOpen] = useLocalStorageState(false, "modalOpen");
  const [encounteredPokemon, setEncounteredPokemon] = useLocalStorageState(null,"encounteredPokemon");
  const [hpEnhance, setHpEnhance] = useLocalStorageState(0, "hpEnhance");
  const [showInstructions, setShowInstructions] = useLocalStorageState(true,"showInstructions");
  const [isTransforming, setIsTransforming] = useLocalStorageState(false,"isTransforming");
  const [isLevelModalOpen, setIsLevelModalOpen] = useLocalStorageState(false,"isLevelModalOpen");
  const [isSettingsOpen, setIsSettingsOpen] = useLocalStorageState(false,"isSettingsOpen");
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [audio] = useState(new Audio("/backgroundMusic.mp3"));
  const [currentLevel, setCurrentLevel] = useLocalStorageState(1,"currentLevel");
  const [progress, setProgress] = useLocalStorageState(
    { catchPokemon: 0, collectPokeballs: 0, collectBerries: 0 },
    "progress"
  );
  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false); // State for showing level up pop-up
  
  const checkLevelCompletion = () => {
    const currentRequirements = levelRequirements.find(
      (req) => req.level === currentLevel
    );
    if (
      (currentRequirements.catchPokemon === undefined ||
        progress.catchPokemon >= currentRequirements.catchPokemon) &&
      (currentRequirements.collectPokeballs === undefined ||
        progress.collectPokeballs >= currentRequirements.collectPokeballs) &&
      (currentRequirements.collectBerries === undefined ||
        progress.collectBerries >= currentRequirements.collectBerries)
    ) {
      setCurrentLevel((prevLevel) => prevLevel + 1);
      setProgress({ catchPokemon: 0, collectPokeballs: 0, collectBerries: 0 });
      setShowLevelUpPopup(true); // Show level up pop-up
    }
  };

  useEffect(() => {
    checkLevelCompletion();
  }, [progress]);

  const openLevelModal = () => {
    setIsLevelModalOpen(true);
  };

  const openSettingModal = () => {
    setIsSettingsOpen(true);
  };

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
    }, 4000);
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
      setProgress((prevProgress) => ({
        ...prevProgress,
        collectBerries: prevProgress.collectBerries + 1,
      }));
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
      // increase the player's score when they catch a pokeball
      setProgress((prevProgress) => ({
        ...prevProgress,
        collectPokeballs: prevProgress.collectPokeballs + 1,
      }));
      setPokeballCount((prevCount) => prevCount + 1);
    }
  }, 310);

  // Catch Pokemon (for now just catch it by moving on it)
  const checkPokemonCollision = debounce((playerX, playerY) => {
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
  }, 150);

  return (
    <>
      {showInstructions && (
        <div className="instruction-card">
          <h2>Welcome {playerName}!</h2>
          <p>Use the arrow keys to move Ditto.</p>
          <p>Press the spacebar to start playing.</p>
        </div>
      )}
      <NavBar
        playerName={playerName}
        selectedPokemon={selectedPokemon}
        hpEnhance={hpEnhance}
        openLevelModal={openLevelModal}
        openSettingModal={openSettingModal}
        currentLevel={currentLevel}
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
        setProgress={setProgress}
      />

      {isLevelModalOpen && (
        <LevelCard
          setIsLevelModalOpen={setIsLevelModalOpen}
          progress={progress}
          currentLevel={currentLevel}
        />
      )}
      {isSettingsOpen && (
        <SettingCard
          setIsSettingsOpen={setIsSettingsOpen}
          isMusicOn={isMusicOn}
          setIsMusicOn={setIsMusicOn}
          audio={audio}
        />
      )}
      {showLevelUpPopup && (
        <LevelUpPopup
          currentLevel={currentLevel}
          onClose={() => setShowLevelUpPopup(false)}
        />
      )}
    </>
  );
}

const LevelUpPopup = ({ currentLevel, onClose }) => {
  return (
    <div className="instruction-card">
      <h2 style={{fontSize: "32px", color: "#fa5252"}}>Congratulations! You've reached level {currentLevel}! &#128513;</h2>
      <button className="btn-add2" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default World;
