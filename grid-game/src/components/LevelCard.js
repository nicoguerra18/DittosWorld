import React from "react";

export default function LevelCard({
  setIsLevelModalOpen,
  currentLevel,
  progress,
}) {
  // Level Requirements
  const levelRequirements = [
    { level: 1, catchPokemon: 2, collectPokeballs: 2, collectBerries: 2 },
    { level: 2, catchPokemon: 5, collectPokeballs: 5, collectBerries: 10 },
    { level: 3, catchPokemon: 7, collectPokeballs: 5, collectBerries: 5 },
    { level: 4, catchPokemon: 10, collectPokeballs: 5, collectBerries: 10 },
    { level: 5, catchPokemon: 20, collectPokeballs: 10, collectBerries: 15 },
    { level: 6, catchPokemon: 5, collectPokeballs: 10, collectBerries: 20 },
    { level: 7, catchPokemon: 50, collectPokeballs: 10, collectBerries: 15 },
    // Add more levels as needed
  ];

  const currentRequirements = levelRequirements.find(
    (req) => req.level === currentLevel
  );

  const tasks = [
    {
      description: `Catch ${
        currentRequirements.catchPokemon
      } Pokemon (${Math.max(
        0,
        currentRequirements.catchPokemon - progress.catchPokemon
      )}  needed)`,
      completed: progress.catchPokemon >= currentRequirements.catchPokemon,
    },
    {
      description: `Collect ${
        currentRequirements.collectPokeballs
      } Pokeballs (${Math.max(
        0,
        currentRequirements.collectPokeballs - progress.collectPokeballs
      )} needed)`,
      completed:
        progress.collectPokeballs >= currentRequirements.collectPokeballs,
    },
    {
      description: `Collect ${
        currentRequirements.collectBerries
      } Berries (${Math.max(
        0,
        currentRequirements.collectBerries - progress.collectBerries
      )} needed)`,
      completed: progress.collectBerries >= currentRequirements.collectBerries,
    },
  ];

  return (
    <div className="instruction-card">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        fill="currentColor"
        class="bi bi-x-circle-fill"
        viewBox="0 0 16 16"
        onClick={() => setIsLevelModalOpen(false)}
        className="btn-card"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
      </svg>

      <h2 className="setting-title">Level {currentLevel}</h2>

      <div className="tasks">
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <h3>
              Task {index + 1}{" "}
              {task.completed && (
                <span style={{ fontSize: "22px" }} className="checkmark">
                  &#9989;
                </span>
              )}
            </h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
