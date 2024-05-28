import { useState, useEffect } from "react";

export default function SettingCard({
  setIsSettingsOpen,
  isMusicOn,
  setIsMusicOn,
  audio,
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
        <h2 style={{ color: "#fa5252" }}>Settings</h2>
      </div>
      <div className="tasks">
        <div className="task">
          <p>
            <strong>Music</strong>{" "}
          </p>
          <p>
            <label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-volume-up-fill"
                viewBox="0 0 16 16"
                style={{ marginBottom: "-2px" }}
              >
                <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
                <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
                <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06" />
              </svg>
              <input
                type="radio"
                value="on"
                checked={isMusicOn === true}
                onChange={handleMusicToggle}
                className="radio"
              />
            </label>
            &nbsp; &nbsp; &nbsp;
            <label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-volume-mute-fill"
                viewBox="0 0 16 16"
                style={{
                  marginBottom: "-2px",
                }}
              >
                <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0" />
              </svg>
              <input
                type="radio"
                value="off"
                checked={isMusicOn === false}
                onChange={handleMusicToggle}
                className="radio"
              />
            </label>
          </p>
        </div>
        <div className="task">
          <p>
            {" "}
            <strong>Leave Game (All progress will be lost)</strong>
          </p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="#fa5252"
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
