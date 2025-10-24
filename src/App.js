import React, { useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import GameCanvas from "./components/GameCanvas.js";
import RoomSelection from "./components/RoomSelection.js";
import GameModeSelection from "./components/GameModeSelection.js";
import PlayerSelection from "./components/PlayerSelection.js";
import GameOver from "./components/GameOver.js";
import Scoreboard from "./components/Scoreboard.js";
import MobileControls from "./components/MobileControls.js";

const socket = io(process.env.REACT_APP_SERVER_URL || "http://localhost:3000", {
  transports: ["websocket", "polling"],
  reconnection: true,
});

function App() {
  const [, setCurrentRoom] = useState(null);
  const [roomCode, setRoomCode] = useState("");
  const [gameMode, setGameMode] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(null);
  const [players, setPlayers] = useState({});
  const [hearts, setHearts] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(null);
  const [gameInfo, setGameInfo] = useState("");
  const [message, setMessage] = useState("");
  const [showRoomSelection, setShowRoomSelection] = useState(true);
  const [showGameModeSelection, setShowGameModeSelection] = useState(false);
  const [showPlayerSelection, setShowPlayerSelection] = useState(false);
  const [isHost, setIsHost] = useState(false);

  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);

  const canvasRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const gameDuration = 5 * 60 * 1000;
  const targetScore = 50;

  const startTimer = useCallback(() => {
    const gameEndTime = Date.now() + gameDuration;
    timerIntervalRef.current = setInterval(() => {
      const timeLeft = Math.max(0, gameEndTime - Date.now());
      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);
      setGameInfo(`⏱️ Time: ${minutes}:${seconds.toString().padStart(2, "0")}`);

      if (timeLeft <= 0) {
        clearInterval(timerIntervalRef.current);
        socket.emit("timeUp");
      }
    }, 100);
  }, [gameDuration]);

  // Socket connection logging
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setMessage("Connection error. Please make sure the server is running.");
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);

  // Socket event listeners
  useEffect(() => {
    socket.on("roomCreated", (roomId) => {
      setCurrentRoom(roomId);
      setRoomCode(roomId);
      setShowRoomSelection(false);
      setShowGameModeSelection(true);
      setIsHost(true);
    });

    socket.on("roomJoined", (data) => {
      setCurrentRoom(data.roomId);
      setRoomCode(data.roomId);
      setShowRoomSelection(false);
      setIsHost(!!data.isHost);

      // Joiners should never choose the mode; wait for host or proceed if already set
      if (data.hasGameMode) {
        setGameMode(data.gameMode);
        setShowGameModeSelection(false);
        setShowPlayerSelection(true);
      } else {
        setShowGameModeSelection(false);
        setGameInfo("⏳ Waiting for host to choose game mode...");
      }
    });

    socket.on("roomNotFound", () => {
      setMessage("Room not found! Check the code and try again.");
    });

    socket.on("playerAssigned", (num) => {
      setPlayerNumber(num);
      setShowPlayerSelection(false);
      setGameInfo("⏳ Waiting for other player...");
    });

    socket.on("waitingForPlayer", () => {
      setGameInfo("⏳ Waiting for other player...");
    });

    socket.on("gameModeSet", (mode) => {
      setGameMode(mode);
      // If you're not the host, proceed to player selection once mode is set
      if (!isHost) {
        setShowPlayerSelection(true);
        setGameInfo("");
      }
    });

    socket.on("gameStarted", () => {
      setGameInfo("");
      setGameStarted(true);
      if (gameMode === "timer") {
        startTimer();
      }
    });

    socket.on("playerTaken", (num) => {
      setMessage(`Player ${num} is already taken`);
    });

    socket.on("playersUpdate", (data) => {
      setPlayers(data);
    });

    socket.on("heartsUpdate", (data) => {
      setHearts(data);
    });

    socket.on("waitingForGameMode", () => {
      setGameInfo("⏳ Waiting for host to choose game mode...");
    });

    socket.on("gameOver", (data) => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      setGameOver(data);
      setGameStarted(false);
    });

    return () => {
      socket.off("roomCreated");
      socket.off("roomJoined");
      socket.off("roomNotFound");
      socket.off("playerAssigned");
      socket.off("waitingForPlayer");
      socket.off("gameModeSet");
      socket.off("gameStarted");
      socket.off("playerTaken");
      socket.off("playersUpdate");
      socket.off("heartsUpdate");
      socket.off("waitingForGameMode");
      socket.off("gameOver");
    };
  }, [gameMode, startTimer, isHost]);

  const updateGameInfo = useCallback(() => {
    if (gameMode === "target" && gameStarted) {
      const maxScore = Math.max(
        ...Object.values(players).map((p) => p.score || 0),
        0
      );
      setGameInfo(`🎯 Target: ${maxScore}/${targetScore}`);
    }
  }, [gameMode, players, gameStarted, targetScore]);

  useEffect(() => {
    updateGameInfo();
  }, [updateGameInfo]);

  const handleCreateRoom = () => {
    socket.emit("createRoom");
  };

  const handleJoinRoom = (code) => {
    if (code) {
      socket.emit("joinRoom", code);
    } else {
      setMessage("Please enter a room code");
    }
  };

  const handleGameModeSelect = (mode) => {
    setGameMode(mode);
    socket.emit("setGameMode", mode);
    setShowGameModeSelection(false);
    setShowPlayerSelection(true);
  };

  const handlePlayerSelect = (playerNum) => {
    const canvas = canvasRef.current;
    socket.emit("choosePlayer", {
      player: playerNum,
      mode: gameMode,
      screenHeight: canvas?.height || 1080,
      basketY: (canvas?.height || 1080) - 100,
    });
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500">
      {showRoomSelection && (
        <RoomSelection
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
          message={message}
        />
      )}

      {showGameModeSelection && isHost && (
        <GameModeSelection
          roomCode={roomCode}
          onSelectMode={handleGameModeSelect}
        />
      )}

      {showPlayerSelection && (
        <PlayerSelection
          onSelectPlayer={handlePlayerSelect}
          message={message}
        />
      )}

      {gameOver && (
        <GameOver
          winner={gameOver.winner}
          scores={gameOver.scores}
          onPlayAgain={handlePlayAgain}
        />
      )}

      <Scoreboard players={players} gameInfo={gameInfo} />

      <GameCanvas
        ref={canvasRef}
        socket={socket}
        playerNumber={playerNumber}
        players={players}
        setPlayers={setPlayers}
        hearts={hearts}
        leftPressed={leftPressed}
        rightPressed={rightPressed}
        gameStarted={gameStarted}
      />

      <MobileControls
        onLeftPress={() => setLeftPressed(true)}
        onLeftRelease={() => setLeftPressed(false)}
        onRightPress={() => setRightPressed(true)}
        onRightRelease={() => setRightPressed(false)}
      />
    </div>
  );
}

export default App;
