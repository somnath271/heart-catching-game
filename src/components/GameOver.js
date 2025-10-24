import React from "react";

function GameOver({ winner, scores, onPlayAgain }) {
  const winnerText = winner
    ? winner === 1
      ? "Player 1 ❤️"
      : "Player 2 💙"
    : "Tie!";

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-[200] bg-black bg-opacity-90 p-12 rounded-3xl border-4 border-yellow-400">
      <h1 className="text-6xl font-bold text-yellow-400 mb-6 drop-shadow-lg">
        🎉 Game Over! 🎉
      </h1>

      <div className="text-3xl text-white mb-8">
        <div className="text-5xl mb-6">Winner: {winnerText}</div>
        <div className="text-2xl leading-relaxed">
          <div>Player 1 ❤️: {scores[1] || 0} hearts</div>
          <div>Player 2 💙: {scores[2] || 0} hearts</div>
        </div>
      </div>

      <button
        onClick={onPlayAgain}
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold text-2xl px-12 py-4 rounded-lg transition-all transform hover:scale-105"
      >
        Play Again
      </button>
    </div>
  );
}

export default GameOver;
