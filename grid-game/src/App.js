import React, { useState } from "react";
import Game from "./components/Game";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div>
        <Game />
      </div>
    </RecoilRoot>
  );
}
export default App;
