import React from "react";
import { useState } from "react";
import { pokeball } from "../images";
import { berry } from "../images";

function Pokedex({ myPokemonList, berryCount, pokeballCount }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePokedex = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      <div className="box">
        {isOpen ? (
          <YourPokemon
            myPokemonList={myPokemonList}
            pokeballCount={pokeballCount}
            berryCount={berryCount}
            togglePokedex={togglePokedex}
          />
        ) : (
          <Summary
            pokeballCount={pokeballCount}
            berryCount={berryCount}
            myPokemonList={myPokemonList}
            togglePokedex={togglePokedex}
          />
        )}
      </div>
    </>
  );
}

function YourPokemon({
  myPokemonList,
  onDeletePokemon,
  pokeballCount,
  berryCount,
  togglePokedex,
}) {
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
          <img src={pokeball} />
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
        {Object.values(myPokemonList).map(({ id, name, count, data }) => (
          <AddedPokemon
            key={id}
            data={data}
            count={count}
            onDeletePokemon={() => onDeletePokemon(id)}
          />
        ))}
      </ul>
    </div>
  );
}

function AddedPokemon({ data, count }) {
  // Capitalize the first letter of the Pokemon name
  const capitalizedPokemonName =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);

  return (
    <li key={data.id}>
      <img
        src={data.sprites["front_default"]}
        alt={data.name}
        style={{ width: "60px", height: "60px" }}
      />
      <h3>{capitalizedPokemonName}</h3>
      <div>
        <p>
          <span>#️⃣ {count}</span>
        </p>

        <p>
          <span>
            Type:
            {data.types.map((type, index) => (
              <span key={index}> {type.type.name}</span>
            ))}
          </span>
        </p>
      </div>
    </li>
  );
}

function Summary({ pokeballCount, berryCount, myPokemonList, togglePokedex }) {
  return (
    <div className="summary">
      <div className="pokedexSum">
        <p>
          <img
            src={pokeball}
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

export default Pokedex;
