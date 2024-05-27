import { useState } from "react";

export default function LevelCard({ setIsLevelModalOpen }) {
  // Define state variables to track task completion
  const [taskCompleted, setTaskCompleted] = useState({
    task1: true,
    task2: true,
    task3: false,
  });

  return (
    <div className="instruction-card">
      <button className="btn-close" onClick={() => setIsLevelModalOpen(false)}>
        Close
      </button>
      <div>
        <h2>Current Level: 1</h2>
      </div>
      <div className="tasks">
        <div className="task">
          <h3>
            Task 1{" "}
            {taskCompleted.task1 && (
              <span style={{ fontSize: "22px" }} className="checkmark">
                &#9989;
              </span>
            )}
          </h3>
          <p>Catch a Water-Type Pokemon</p>
        </div>
        <div className="task">
          <h3>
            Task 2{" "}
            {taskCompleted.task2 && (
              <span className="checkmark" style={{ fontSize: "22px" }}>
                &#9989;
              </span>
            )}
          </h3>
          <p>Catch 5 wild Pokémon</p>
        </div>
        <div className="task">
          <h3>
            Task 3{" "}
            {taskCompleted.task3 && (
              <span className="checkmark" style={{ fontSize: "22px" }}>
                &#9989;
              </span>
            )}
          </h3>
          <p>Collect 20 berries</p>
        </div>
      </div>
    </div>
  );
}
