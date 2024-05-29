import React from "react";
import { useEffect, useState } from "react";
import CatchPokemon from "./CatchPokemon";

export default function CatchPokemonModal({
  modalOpen,
  setModalOpen,
  pokemon,
  player,
  pokeballCount,
  setPokeballCount,
  setMyPokemonList,
  setProgress,
}) {
  const [caughtFlag, setCaughtFlag] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      // Reset caughtFlag to false when the modal opens
      setCaughtFlag(false);
    }
  }, [modalOpen]); // Run this effect whenever modalOpen changes

  useEffect(() => {
    if (caughtFlag) {
      const timer = setTimeout(() => {
        setModalOpen(false);
      }, 4000); // Delay of 2000ms or 2 seconds

      return () => clearTimeout(timer); // Cleanup the timeout if component unmounts
    }
  }, [caughtFlag, setModalOpen]);

  return (
    <div className="modal" style={{ display: modalOpen ? "block" : "none" }}>
      <div className="modal-content">
        <span className="close" onClick={() => setModalOpen(false)}>
          Leave
        </span>
        <div className="modal-body">
          {pokemon && (
            <CatchPokemon
              pokemon={pokemon}
              player={player}
              pokeballCount={pokeballCount}
              setPokeballCount={setPokeballCount}
              setMyPokemonList={setMyPokemonList}
              setCaughtFlag={setCaughtFlag}
              caughtFlag={caughtFlag}
              setProgress={setProgress}
            />
          )}
        </div>
      </div>
    </div>
  );
}
