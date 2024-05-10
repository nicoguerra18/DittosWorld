import React, { useState } from "react";
import PokemonPicker from "./components/PokemonPicker";
import World from "./components/World";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <>
      {/* <PokemonPicker setSelectedPokemon={setSelectedPokemon} /> */}
      <World />
    </>
  );
}

export default App;
