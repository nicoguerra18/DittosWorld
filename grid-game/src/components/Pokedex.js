import React from "react";
import { useState } from "react";
import { dpokeball } from "../images";
import { berry } from "../images";

function Pokedex({
  myPokemonList,
  berryCount,
  setBerryCount,
  pokeballCount,
  setDetailsModalOpen,
  setSelectedPokemon,
  setHpEnhance,
  selectedPokemon,
  hpEnhance,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState(null);

  const togglePokedex = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      <div className="box">
        {pokemonInfo ? (
          <PokemonInfo
            pokemonInfo={pokemonInfo}
            setPokemonInfo={setPokemonInfo}
          />
        ) : (
          <>
            {isOpen ? (
              <YourPokemon
                myPokemonList={myPokemonList}
                pokeballCount={pokeballCount}
                berryCount={berryCount}
                togglePokedex={togglePokedex}
                setDetailsModalOpen={setDetailsModalOpen}
                pokemonInfo={pokemonInfo}
                setPokemonInfo={setPokemonInfo}
                setSelectedPokemon={setSelectedPokemon}
                setHpEnhance={setHpEnhance}
                selectedPokemon={selectedPokemon}
                hpEnhance={hpEnhance}
                setBerryCount={setBerryCount}
              />
            ) : (
              <Summary
                pokeballCount={pokeballCount}
                berryCount={berryCount}
                myPokemonList={myPokemonList}
                togglePokedex={togglePokedex}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

function YourPokemon({
  myPokemonList,
  pokeballCount,
  berryCount,
  setBerryCount,
  togglePokedex,
  setDetailsModalOpen,
  setPokemonInfo,
  setSelectedPokemon,
  setHpEnhance,
  selectedPokemon,
  hpEnhance,
}) {
  // Find the HP stat
  const hpStat = selectedPokemon.stats.find((stat) => stat.stat.name === "hp");
  const currentHp = hpStat.base_stat + hpEnhance;

  const handlePowerUp = () => {
    if (berryCount > 0) {
      setHpEnhance((prev) => prev + 3);
      setBerryCount((prev) => prev - 1);
    }
  };

  return (
    <div className="summary">
      <div className="title">
        <h2>Pokédex</h2>
        <button className="btn-toggle" onClick={togglePokedex}>
          Close
        </button>
      </div>

      <div className="pokedexSum">
        <p>
          <img src={dpokeball} />
          <span>{pokeballCount}</span>
        </p>
        <p>
          <img src={berry} />
          <span>{berryCount}</span>
        </p>
        <p>
          <span>#️⃣</span>
          <span>Unique Pokémon: {Object.keys(myPokemonList).length}</span>
        </p>
      </div>
      <ul className="list">
        <li
          className="list"
          style={{
            border: "3px solid gold",
          }}
        >
          <h2>
            {selectedPokemon.name.charAt(0).toUpperCase() +
              selectedPokemon.name.slice(1)}
          </h2>
          <img
            src={selectedPokemon.sprites["front_default"]}
            alt={selectedPokemon.name}
            style={{ width: "90px", height: "90px" }}
          />
          <h2>
            {hpStat.base_stat} HP +
            <span style={{ color: "gold", fontSize: "1.7rem" }}>
              {" "}
              {hpEnhance}
            </span>
          </h2>

          <p>
            <button
              className="btn-add"
              style={{ backgroundColor: "#ffd700", color: "#000" }}
              onClick={handlePowerUp}
            >
              Power Up+
            </button>
          </p>
        </li>
      </ul>

      <ul className="list">
        {Object.keys(myPokemonList).map((id) => (
          <AddedPokemon
            key={id}
            data={myPokemonList[id]}
            setDetailsModalOpen={setDetailsModalOpen}
            setPokemonInfo={setPokemonInfo}
            setSelectedPokemon={setSelectedPokemon}
            setHpEnhance={setHpEnhance}
          />
        ))}
      </ul>
    </div>
  );
}

function AddedPokemon({
  data,
  setPokemonInfo,
  setSelectedPokemon,
  setHpEnhance,
}) {
  // Capitalize the first letter of the Pokemon name
  const capitalizedPokemonName =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);

  const handlePokemonChange = (data) => {
    setSelectedPokemon(data);
    setHpEnhance(0);
  };

  // Find the HP stat
  const hpStat = data.stats.find((stat) => stat.stat.name === "hp");

  return (
    <li className="list" key={data.id}>
      <img
        src={data.sprites["front_default"]}
        alt={data.name}
        style={{ width: "90px", height: "90px" }}
      />

      <h2>{capitalizedPokemonName}</h2>
      {hpStat && <h2>{hpStat.base_stat} HP</h2>}

      <p>
        <button onClick={() => setPokemonInfo(data)} className="btn-add">
          View Details
        </button>
        <button
          onClick={() => handlePokemonChange(data)}
          className="btn-add"
          style={{ backgroundColor: "#3ed65d" }}
        >
          Transform
        </button>
      </p>
    </li>
  );
}

function Summary({ pokeballCount, berryCount, myPokemonList, togglePokedex }) {
  return (
    <div className="summary">
      <div className="pokedexSum">
        <p>
          <img
            src={dpokeball}
            alt="Pokeball"
            style={{ width: "3vw", height: "3vw" }}
          />
          <span>{pokeballCount}</span>
        </p>
        <p>
          <img
            src={berry}
            alt="Berry"
            style={{ width: "4vw", height: "4vw" }}
          />
          <span>{berryCount}</span>
        </p>
        <p>
          <span>#</span>
          <span> {Object.keys(myPokemonList).length}</span>
        </p>
        <p>
          <button
            className="btn-toggle"
            onClick={togglePokedex}
            style={{ width: "3vw", height: "3vw" }}
          >
            Open
          </button>
        </p>
      </div>
    </div>
  );
}

function PokemonInfo({ pokemonInfo, setPokemonInfo }) {
  return (
    <div className="summary">
      <div className="title">
        <h2>{pokemonInfo.name}</h2>
        <button className="btn-close" onClick={() => setPokemonInfo(false)}>
          Back
        </button>
      </div>

      <div>
        <img
          src={pokemonInfo.sprites.front_default}
          alt="front sprite"
          style={{ width: "200px", height: "200px" }}
        />
        <img
          src={pokemonInfo.sprites.back_default}
          alt="rear sprite"
          style={{ width: "200px", height: "200px" }}
        />
      </div>
      <div>
        <h2 style={{ color: "#fff" }}> STATS </h2>
      </div>
      <br />
      <div>
        <span style={{ color: "#c7bebe" }}>
          {pokemonInfo.stats.map((stat, index) => (
            <li key={index}>
              {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}
              : {stat.base_stat}
            </li>
          ))}
        </span>
        <span style={{ color: "#c7bebe" }}>
          {pokemonInfo.types.map((type, index) => (
            <li key={index}> Type: {type.type.name}</li>
          ))}
        </span>{" "}
      </div>
      <br />
      {/* <div>
        <span style={{ color: "#c7bebe" }}>
          {pokemonInfo.stats.map((stat, index) => (
            <li key={index}>
              {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}
              : {stat.base_stat}
            </li>
          ))}
        </span>
        <span style={{ color: "#c7bebe" }}>
          {pokemonInfo.types.map((type, index) => (
            <li key={index}> Type: {type.type.name}</li>
          ))}
        </span>{" "}
      </div> */}
    </div>
  );
}

// press view info -> sets pokemonInfo to that pokemon and
// if pokemonInfo is set then I display that in the box
// when i close then i set it back to null

export default Pokedex;
