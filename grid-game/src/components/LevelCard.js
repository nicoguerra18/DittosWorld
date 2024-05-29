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
      <button className="btn-close" onClick={() => setIsLevelModalOpen(false)}>
        Close
      </button>
      <div>
        <h2 style={{ color: "#fa5252" }}>Current Level: {currentLevel}</h2>
      </div>
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
