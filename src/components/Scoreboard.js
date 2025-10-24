import React from "react";

function Scoreboard({ players, gameInfo }) {
  return (
    <div className="fixed top-4 w-full flex justify-around items-center z-50 text-white text-xl px-4">
      <div>
        ❤️ Player 1: <span id="score1">{players[1]?.score || 0}</span>
      </div>
      <div className="text-2xl font-bold text-yellow-300 drop-shadow-lg">
        {gameInfo}
      </div>
      <div>
        💙 Player 2: <span id="score2">{players[2]?.score || 0}</span>
      </div>
    </div>
  );
}

export default Scoreboard;
