import './WinToast.css';

export const WinToast = ({ moves, onPlayAgain }) => {
  return (
    <div className="win-overlay">
      <div className="win-toast">
        <h2>🎉 Congrats!</h2>
        <p>You finished the game in <strong>{moves}</strong> moves</p>
        <button onClick={onPlayAgain}>Play Again</button>
      </div>
    </div>
  );
};