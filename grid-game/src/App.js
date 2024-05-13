import React, { useState } from "react";
import PokeHopper from "./components/PokeHopper";
import PokemonPicker from "./components/PokemonPicker";
import World from "./components/World";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="App">
      {/* <PokemonPicker setSelectedPokemon={setSelectedPokemon} /> */}
      <PokeHopper />
    </div>
  );
}

export default App;
