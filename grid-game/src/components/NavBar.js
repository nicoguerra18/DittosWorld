import { star } from "../images";

export default function NavBar({
  selectedPokemon,
  hpEnhance,
  openLevelModal,
  openSettingModal,
  currentLevel
}) {
  return (
    <nav className="nav-bar">
      <div>
        <Logo
          selectedPokemon={selectedPokemon}
          hpEnhance={hpEnhance}
          openLevelModal={openLevelModal}
          openSettingModal={openSettingModal}
          currentLevel={currentLevel}
        />
      </div>
    </nav>
  );
}

function Logo({
  selectedPokemon,
  hpEnhance,
  openLevelModal,
  openSettingModal,
  currentLevel
}) {
  // Ensure selectedPokemon is loaded before accessing its properties
  if (!selectedPokemon || !selectedPokemon.stats) {
    return null; // or return a loading indicator
  }

  // Find the HP stat
  const hpStat = selectedPokemon.stats.find((stat) => stat.stat.name === "hp");
  const currentHp = hpStat.base_stat + hpEnhance;

  return (
    <div
      className="logo"
      style={{
        justifyContent: "space-between",
        width: "100%", // Make sure the container takes full width
      }}
    >
      <div>
        <img
          src={selectedPokemon.sprites["front_default"]}
          alt={selectedPokemon.name}
          style={{
            width: "100px",
            height: "100px",
            marginBottom: "-10px",
            marginLeft: "-2rem",
          }}
        />
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-heart-fill"
          viewBox="0 0 16 16"
          style={{ marginTop: "4" }}
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
          />
        </svg>
      </div>
      <h2 className="main-title">{currentHp} HP</h2>
      <div style={{ right: "50%", position: "absolute" }}>
        <h2 className="main-title">
          <img
            src={star}
            onClick={openLevelModal}
            className="star-icon"
            style={{ width: "40px", height: "40px" }}
            alt="Star"
          />
          {"  "}{currentLevel}
        </h2>
      </div>
      <div style={{ right: "9rem", position: "absolute" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="white"
          class="bi bi-gear-fill"
          viewBox="0 0 16 16"
          style={{ marginTop: "6", width: "30px", height: "30px" }}
          className="star-icon"
          onClick={openSettingModal}
        >
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
        </svg>
      </div>
    </div>
  );
}
