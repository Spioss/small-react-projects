import "./Header.css";

export const MainHeader = ( {score, moves, onReset} ) => {
  return (
    <div className="main">
      <h1>🎲 Memory Card Game</h1>

      <div className="stats">
        <div className="stat-item">
          SCORE <span className="stat-value">{score}</span>
        </div>
        <div className="stat-item">
          MOVES <span className="stat-value">{moves}</span>
        </div>
      </div>

      <button className="reset-btn" onClick={onReset}>🎮️ New Game</button>
    </div>
  );
};
