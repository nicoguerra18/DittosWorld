import React, { useState } from "react";
import PokeHopper from "./components/PokeHopper";
import PokemonPicker from "./components/PokemonPicker";
import Button from "react-bootstrap/Button";
import { RecoilRoot } from "recoil";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <RecoilRoot>
      <div>
        {/* <PokemonPicker setSelectedPokemon={setSelectedPokemon} /> */}

        <PokeHopper />
      </div>
    </RecoilRoot>
  );
}





export default App;
