import React from "react";

function PlayerSelection({ onSelectPlayer, message }) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50 bg-black bg-opacity-60 p-8 rounded-xl">
      <h2 className="text-3xl font-bold text-white mb-6">Choose Your Player</h2>

      <button
        onClick={() => onSelectPlayer(1)}
        className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white border-2 border-white rounded-lg px-8 py-4 text-xl font-bold m-3 transition-all transform hover:scale-105"
      >
        Player 1 ❤️
      </button>

      <button
        onClick={() => onSelectPlayer(2)}
        className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white border-2 border-white rounded-lg px-8 py-4 text-xl font-bold m-3 transition-all transform hover:scale-105"
      >
        Player 2 💙
      </button>

      {message && <p className="text-yellow-300 font-bold mt-4">{message}</p>}
    </div>
  );
}

export default PlayerSelection;
