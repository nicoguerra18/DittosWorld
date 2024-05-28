import { useState, useEffect } from "react";

export default function SettingCard({
  setIsSettingsOpen,
  isMusicOn,
  setIsMusicOn,
  audio
}) {
  

  const resetAllState = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Play Music
  useEffect(() => {
    if (isMusicOn) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audio.pause();
    }
  }, [isMusicOn, audio]);

  const handleMusicToggle = (event) => {
    setIsMusicOn(event.target.value === "on");
  };

  return (
    <div className="instruction-card">
      <button className="btn-close" onClick={() => setIsSettingsOpen(false)}>
        Close
      </button>
      <div>
        <h2>Settings</h2>
      </div>
      <div className="tasks">
        <div className="task">
          <p>
            Music:{"  "}
            <label>
              <input
                type="radio"
                value="on"
                checked={isMusicOn === true}
                onChange={handleMusicToggle}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16">
  <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>
</svg>
            </label>
            <label>
              <input
                type="radio"
                value="off"
                checked={isMusicOn === false}
                onChange={handleMusicToggle}
              />
              Off
            </label>
          </p>
        </div>
        <div className="task">
          <p> Leave Game (All progress will be lost)</p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-door-open-fill"
              viewBox="0 0 16 16"
              className="star-icon"
              onClick={resetAllState}
            >
              <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}
