import React, { useState, useEffect } from "react";
import World from "./World";
import "../index.css";
import axios from "axios";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

function Game() {
  const [selectedPokemon, setSelectedPokemon] = useLocalStorageState(
    [],
    "selectedPokemon"
  ); //Local Storage
  const [playerName, setPlayerName] = useLocalStorageState("", "playerName"); //Local Storage
  const [entered, setEntered] = useLocalStorageState(false, "entered"); //Local Storage
  const [ready, setReady] = useLocalStorageState(false, "ready"); //Local Storage
  const [myPokemonList, setMyPokemonList] = useLocalStorageState(
    {},
    "myPokemonList"
  );

  const handleEnter = () => {
    setEntered(true);
  };

  return (
    <>
      {entered ? (
        ready ? (
          <div>
            <World
              setSelectedPokemon={setSelectedPokemon}
              selectedPokemon={selectedPokemon}
              playerName={playerName}
              myPokemonList={myPokemonList}
              setMyPokemonList={setMyPokemonList}
            />
          </div>
        ) : (
          <PokemonPicker
            setSelectedPokemon={setSelectedPokemon}
            setReady={setReady}
            playerName={playerName}
            setPlayerName={setPlayerName}
            setMyPokemonList={setMyPokemonList}
          />
        )
      ) : (
        <IntroPage handleEnter={handleEnter} />
      )}
    </>
  );
}

function IntroPage({ handleEnter }) {
  return (
    <div className="intro-container">
      <div className="intro-content">
        <h2 className="intro-title">Welcome to Ditto's World!</h2>
        <div className="intro-card2">
          <p>
            Once upon a time, in the vibrant and diverse Pokémon world, lived a
            peculiar Pokémon named <b>Ditto</b>. Unlike others, Ditto possessed
            the extraordinary ability to transform into any Pokémon it
            encountered. Yet, despite this remarkable talent, Ditto felt a deep
            longing for purpose and identity.
          </p>
          <p>
            One fateful day, while wandering through the lush forests of its
            homeland, Ditto stumbled upon a group of Pokémon trainers engaged in
            an intense battle. Mesmerized by the spectacle before it, Ditto felt
            a stirring within its core as it witnessed the unique skills of each
            trainer and Pokémon. Inspired by this sight, Ditto made a
            life-changing decision: to embark on a journey of self-discovery and
            transformation. With newfound determination burning within his{" "}
            <b style={{ color: "purple" }}>purple gelatinous </b>
            form, Ditto's transformation that day, though not physical, was
            undoubtedly his most profound.{" "}
          </p>
          <p>
            Despite facing mockery and ridicule from the community, Ditto
            remained unwavering in his resolve of becoming a Pokémon trainer.
            Ditto’s elder prophesied a quest of self-discovery and the eventual
            role as a beacon of peace, unity, and acceptance in the Pokémon
            world. Ready to begin its great adventure, Ditto made a promise to
            build meaningful connections with every Pokémon he encountered. His
            aim was to unveil the true potential of its transformation
            abilities, allowing himself to deeply empathize with other Pokémon.
            This means understanding their
            <b> struggles, perspectives, and experiences</b>, without any trace
            of judgment, with the goal of fostering a sense of unity and
            understanding in the Pokémon World.
          </p>
          <p>
            With a heart brimming with gratitude and a newfound sense of
            purpose, Ditto bid farewell to its companions and embarked on a new
            chapter, eager to embrace fresh adventures and spread unity and
            understanding throughout the Pokémon world.
          </p>
        </div>
        <br />

        <button className="mybutton" onClick={handleEnter}>
          Enter
        </button>
      </div>
    </div>
  );
}

function PokemonPicker({
  setSelectedPokemon,
  setReady,
  playerName,
  setPlayerName,
  setMyPokemonList,
}) {
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);

  const getPokemon = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/ditto`; // Fetch Ditto directly
      const res = await axios.get(url);
      setPokemonData([res.data]);
      // intialize list with ditto
      setMyPokemonList((prevList) => {
        return { ...prevList, [res.data.id]: res.data };
      });
    } catch (e) {
      console.log(e);
      setError("Failed to fetch Ditto's data.");
    }
  };

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleReady = () => {
    if (playerName.trim()) {
      setSelectedPokemon(pokemonData[0]);
      setReady(true);
    } else {
      if (!playerName.trim()) {
        setError("Please enter your name.");
      } else {
        setError("Failed to fetch Ditto's data.");
      }
    }
  };

  useEffect(() => {
    getPokemon();
  }, []); // Fetch Ditto's data when component mounts

  return (
    <div className="intro-container">
      <div className="intro-content">
        <h2 className="intro-title">Welcome Ditto!</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            <div>
              <input
                className="search"
                type="text"
                onChange={handleNameChange}
                placeholder="Enter Your Name"
                value={playerName}
              />
            </div>
          </label>
        </form>
        {error && <p>❌ {error}</p>}
        <div>
          {pokemonData.map((data) => (
            <div key={data.id}>
              <div>
                <img
                  style={{
                    width: "241px",
                    height: "241px",
                    transform: "scaleX(-1)",
                  }}
                  src={data.sprites["front_default"]}
                  alt={data.name}
                />
              </div>
            </div>
          ))}
        </div>
        <br />
        <button className="mybutton" onClick={handleReady}>
          Start Adventure
        </button>
      </div>
    </div>
  );
}

export default Game;
