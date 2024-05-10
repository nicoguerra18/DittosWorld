import React, { useState } from "react";
import axios from "axios";

function PokemonPicker({ setSelectedPokemon }) {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);

  const getPokemon = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      setPokemonData([res.data]);
      setSelectedPokemon(res.data.name);
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="search"
            type="text"
            onChange={handleChange}
            placeholder="Search Pokémon"
            value={pokemon}
          />
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
    </div>
  );
}

export default PokemonPicker;
