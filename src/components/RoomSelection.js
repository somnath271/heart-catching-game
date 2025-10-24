import React, { useState } from "react";

function RoomSelection({ onCreateRoom, onJoinRoom, message }) {
  const [roomCode, setRoomCode] = useState("");

  const handleJoin = () => {
    onJoinRoom(roomCode.toUpperCase().trim());
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50 bg-black bg-opacity-60 p-8 rounded-xl">
      <h2 className="text-3xl font-bold text-white mb-6">
        🎮 Multiplayer Heart Catching Game
      </h2>

      <button
        onClick={onCreateRoom}
        className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white border-2 border-white rounded-lg px-8 py-4 text-xl font-bold m-3 transition-all transform hover:scale-105"
      >
        Create New Room
      </button>

      <div className="my-6 text-white text-lg">OR</div>

      <input
        type="text"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        placeholder="Enter Room Code"
        maxLength="6"
        className="bg-white bg-opacity-20 text-white border-2 border-white rounded-lg px-4 py-3 text-xl text-center uppercase w-52 mb-3"
      />

      <br />

      <button
        onClick={handleJoin}
        className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white border-2 border-white rounded-lg px-8 py-4 text-xl font-bold m-3 transition-all transform hover:scale-105"
      >
        Join Room
      </button>

      {message && <p className="text-yellow-300 font-bold mt-4">{message}</p>}
    </div>
  );
}

export default RoomSelection;
