import React, { useState } from "react";

function CatchPokemon({ onCatchPokemon }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>Modal Header</h2>
            </div>
            <div className="modal-body">
              <p>Some text in the Modal Body</p>
              <p>Some other text...</p>
            </div>
            <div className="modal-footer">
              <h3>Modal Footer</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CatchPokemon;
