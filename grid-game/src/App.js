import React, { useState } from "react";
import Game from "./components/Game";
import PokemonPicker from "./components/PokemonPicker";
import Button from "react-bootstrap/Button";
import { RecoilRoot } from "recoil";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <RecoilRoot>
      <div>
        {/* <PokemonPicker setSelectedPokemon={setSelectedPokemon} /> */}

        <Game />
      </div>
    </RecoilRoot>
  );
}





export default App;
