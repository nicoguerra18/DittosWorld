import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { dpokeball } from "../images";
import { berry } from "../images";
import { scrollToPlayer } from "./ScrollToPlayer";

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
  triggerTransformation,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const pokedexRef = useRef(null);

  const togglePokedex = () => {
    setIsOpen((open) => !open);
  };

  // CLICK OUTSIDE POKEDEX TO CLOSE IT
  const handleClickOutside = (event) => {
    if (pokedexRef.current && !pokedexRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="box" ref={pokedexRef}>
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
                triggerTransformation={triggerTransformation}
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
  triggerTransformation,
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-x-circle"
          viewBox="0 0 16 16"
          onClick={togglePokedex}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "1.2rem",
            top: "2.2rem",
          }}
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </div>

      <div className="pokedexSum">
        <p>
          <img
            src={dpokeball}
            alt="Pokeball"
            style={{ width: "35px", height: "35px" }}
          />
          <span>{pokeballCount}</span>
        </p>
        <p>
          <img
            src={berry}
            alt="Berry"
            style={{ width: "50px", height: "50px", marginRight: "-8px" }}
          />
          <span>{berryCount}</span>
        </p>
        <p>
          <span>#️⃣</span>
          <span>Pokémon: {Object.keys(myPokemonList).length}</span>
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
              Power Up +
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
            triggerTransformation={triggerTransformation}
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
  triggerTransformation,
}) {
  // Capitalize the first letter of the Pokemon name
  const capitalizedPokemonName =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);

  const handlePokemonChange = (data) => {
    triggerTransformation();

    setTimeout(() => {
      setSelectedPokemon(data);
      setHpEnhance(0); // reset Hp bonus
    }, 2000);
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
        <button
          onClick={() => setPokemonInfo(data)}
          className="btn-add"
          style={{ backgroundColor: "#17B169" }}
        >
          Details{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
            style={{ marginBottom: "-3px" }}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
        <button
          onClick={() => handlePokemonChange(data)}
          className="btn-add"
          style={{ backgroundColor: "#9370DB" }}
        >
          Transform{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-repeat"
            viewBox="0 0 16 16"
            style={{ marginBottom: "-3px" }}
          >
            <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
          </svg>
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
            style={{ width: "35px", height: "35px" }}
          />
          <span>{pokeballCount}</span>
        </p>
        <p>
          <img
            src={berry}
            alt="Berry"
            style={{ width: "50px", height: "50px", marginRight: "-8px" }}
          />
          <span>{berryCount}</span>
        </p>
        <p>
          <span style={{ fontSize: "2.0rem" }}>#</span>
          <span> {Object.keys(myPokemonList).length}</span>
        </p>
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
            onClick={togglePokedex}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "0.8rem",
              fontSize: "50%",
              zIndex: 1500,
            }}
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
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
        <button
          className="btn-close"
          style={{ backgroundColor: "#212529" }}
          onClick={() => setPokemonInfo(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
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
