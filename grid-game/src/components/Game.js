import React, { useState } from "react";
import World from "./World";
import "../index.css";
import axios from "axios";

function Game() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [entered, setEntered] = useState(false);
  const [ready, setReady] = useState(false);

  const handleEnter = () => {
    setEntered(true);
  };

  return (
    <>
      {entered ? (
        ready ? (
          <div>
            <World selectedPokemon={selectedPokemon} />
          </div>
        ) : (
          <PokemonPicker
            setSelectedPokemon={setSelectedPokemon}
            setReady={setReady}
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
        <h2>Welcome to the game!</h2>
        <button className="mybutton" onClick={handleEnter}>
          Enter!
        </button>
      </div>
    </div>
  );
}

function PokemonPicker({ setSelectedPokemon, setReady }) {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);

  const getPokemon = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      setPokemonData([res.data]);
    } catch (e) {
      console.log(e);
      setError("Please enter a valid Pokemon name.");
    }
  };

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the input is empty
    if (!pokemon.trim()) {
      setError("Please enter a Pokemon name.");
      return;
    }
    setError(null); // Clear the error state
    getPokemon();
  };

  const handleReady = () => {
    if (pokemonData.length > 0) {
      setSelectedPokemon(pokemonData[0]);
      setReady(true);
    } else {
      setError("Please enter a Pokemon name.");
    }
    // else I want to diplay a message that tells them to select a pokemon
  };

  return (
    <div className="intro-container">
      <div className="intro-content">
        <h2>Choose Your Pokemon!</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="search"
              type="text"
              onChange={handleChange}
              placeholder="Search Pokémon"
              value={pokemon}
            />
            <button onClick={handleSubmit} className="mybutton">
              Search
            </button>
          </label>
        </form>
        <div>
          {!error &&
            pokemonData.map((data) => (
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
          {error && <p>❌ {error}</p>}
        </div>
        <br />
        {pokemonData.length > 0 && ( // Conditionally render the button
          <button className="mybutton" onClick={handleReady}>
            Select Pokemon
          </button>
        )}
      </div>
    </div>
  );
}

export default Game;
