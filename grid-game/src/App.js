import React, { useState } from "react";
import PokeHopper from "./components/PokeHopper";
import PokemonPicker from "./components/PokemonPicker";
import { Button } from "react-bootstrap";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="App">
      <NavBar />

      {/* <PokemonPicker setSelectedPokemon={setSelectedPokemon} /> */}

      <PokeHopper />
    </div>
  );
}

function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <button className="btn-add">Choose Pokemon</button>
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>Pokémon Hopper</h1>
    </div>
  );
}

export default App;
