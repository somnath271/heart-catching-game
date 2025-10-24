import React, { useState } from "react";

function GameModeSelection({ roomCode, onSelectMode }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50 bg-black bg-opacity-60 p-8 rounded-xl">
      <h2 className="text-2xl text-white mb-4">
        Room Code:{" "}
        <span className="text-yellow-300 text-4xl font-bold tracking-widest">
          {roomCode}
        </span>
      </h2>

      <p className="text-white text-sm mb-4">
        Share this code with your friend!
      </p>

      <button
        onClick={copyCode}
        className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white border-2 border-white rounded-lg px-6 py-2 mb-6 transition-all"
      >
        {copied ? "✅ Copied!" : "📋 Copy Code"}
      </button>

      <h2 className="text-3xl font-bold text-white mb-6">Choose Game Mode</h2>

      <button
        onClick={() => onSelectMode("timer")}
        className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white border-2 border-white rounded-lg px-8 py-4 text-xl font-bold m-3 transition-all transform hover:scale-105"
      >
        ⏱️ 5 Minutes Timer
      </button>

      <button
        onClick={() => onSelectMode("target")}
        className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white border-2 border-white rounded-lg px-8 py-4 text-xl font-bold m-3 transition-all transform hover:scale-105"
      >
        🎯 Catch 50 Hearts
      </button>
    </div>
  );
}

export default GameModeSelection;
