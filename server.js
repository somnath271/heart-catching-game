import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Environment configuration
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3001";

// Allow multiple origins (comma-separated), useful for dev + prod (Vercel)
const allowedOrigins = CLIENT_URL.split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins.length > 1 ? allowedOrigins : CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(express.static(path.join(__dirname, "public")));

const rooms = {};
const basketWidth = 150;
const basketHeight = 25;
const barThickness = 10;

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function createRoom() {
  const roomId = generateRoomCode();
  rooms[roomId] = {
    players: {},
    hearts: [],
    gameMode: null,
    gameActive: false,
    targetScore: 50,
    hostId: null,
  };

  const heartSpawn = setInterval(() => {
    if (rooms[roomId]) {
      rooms[roomId].hearts.push({
        id: Date.now() + Math.random(),
        x: Math.random() * 1920,
        y: 0,
        size: 20 + Math.random() * 10,
        speed: 2 + Math.random() * 3,
      });
    } else {
      clearInterval(heartSpawn);
    }
  }, 800);

  const gameLoop = setInterval(() => {
    const room = rooms[roomId];
    if (!room) {
      clearInterval(gameLoop);
      return;
    }
    if (!room.gameActive) return;

    room.hearts = room.hearts.filter((h) => {
      h.y += h.speed;
      for (let p in room.players) {
        const player = room.players[p];
        const playerY =
          player.y || (player.screenHeight ? player.screenHeight - 110 : 970);
        if (
          h.y + h.size / 2 >= playerY &&
          h.y + h.size / 2 <= playerY + basketHeight + barThickness &&
          h.x > player.x - basketWidth / 2 &&
          h.x < player.x + basketWidth / 2
        ) {
          player.score++;
          io.to(roomId).emit("playersUpdate", room.players);
          if (room.gameMode === "target" && player.score >= room.targetScore) {
            checkGameOver(roomId);
          }
          return false;
        }
      }
      return h.y < 2000;
    });
    io.to(roomId).emit("heartsUpdate", room.hearts);
  }, 1000 / 60);

  rooms[roomId].heartSpawn = heartSpawn;
  rooms[roomId].gameLoop = gameLoop;
  return roomId;
}

function checkGameOver(roomId) {
  const room = rooms[roomId];
  if (!room || !room.gameActive) return;
  room.gameActive = false;
  const scores = {};
  let winner = null;
  let maxScore = 0;
  for (let p in room.players) {
    scores[p] = room.players[p].score || 0;
    if (scores[p] > maxScore) {
      maxScore = scores[p];
      winner = parseInt(p);
    } else if (scores[p] === maxScore) {
      winner = null;
    }
  }
  io.to(roomId).emit("gameOver", { winner, scores });
  setTimeout(() => {
    if (rooms[roomId]) {
      clearInterval(rooms[roomId].heartSpawn);
      clearInterval(rooms[roomId].gameLoop);
      delete rooms[roomId];
    }
  }, 10000);
}

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);
  let currentRoom = null;

  socket.on("createRoom", () => {
    const roomId = createRoom();
    currentRoom = roomId;
    socket.join(roomId);
    // Mark this socket as the host/creator for this room
    rooms[roomId].hostId = socket.id;
    socket.emit("roomCreated", roomId);
    console.log(`Room created: ${roomId}`);
  });

  socket.on("joinRoom", (roomId) => {
    if (rooms[roomId]) {
      currentRoom = roomId;
      socket.join(roomId);
      socket.emit("roomJoined", {
        roomId: roomId,
        gameMode: rooms[roomId].gameMode,
        hasGameMode: rooms[roomId].gameMode !== null,
        isHost: rooms[roomId].hostId === socket.id,
      });
      socket.emit("heartsUpdate", rooms[roomId].hearts);
      socket.emit("playersUpdate", rooms[roomId].players);
      console.log(`Player joined room: ${roomId}`);
    } else {
      socket.emit("roomNotFound");
    }
  });

  socket.on("setGameMode", (mode) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    const room = rooms[currentRoom];
    // Only the host can set the game mode, and only if it hasn't been set yet
    if (socket.id !== room.hostId) return;
    if (!room.gameMode) {
      room.gameMode = mode;
      io.to(currentRoom).emit("gameModeSet", mode);
      console.log(`Game mode set to ${mode} in room: ${currentRoom}`);
      // If two players are already ready, start the game now that the mode is set
      if (Object.keys(room.players).length === 2) {
        room.gameActive = true;
        io.to(currentRoom).emit("gameStarted");
        console.log(`Game started in room: ${currentRoom}`);
      }
    }
  });

  socket.on("choosePlayer", (data) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    const room = rooms[currentRoom];
    const player = data.player;
    if (!room.players[player]) {
      room.players[player] = {
        id: socket.id,
        score: 0,
        x: player === 1 ? 200 : 600,
        screenHeight: data.screenHeight || 1080,
        y: (data.basketY || 980) - barThickness,
      };
      socket.emit("playerAssigned", player);
      io.to(currentRoom).emit("playersUpdate", room.players);

      // Check if both players are ready
      if (Object.keys(room.players).length === 2) {
        // Start only if the game mode has been set by the host
        if (room.gameMode) {
          room.gameActive = true;
          io.to(currentRoom).emit("gameStarted");
          console.log(`Game started in room: ${currentRoom}`);
        } else {
          // Notify room that we're waiting for the host to choose a mode
          io.to(currentRoom).emit("waitingForGameMode");
          console.log(
            `Waiting for host to set game mode in room: ${currentRoom}`
          );
        }
      } else {
        socket.emit("waitingForPlayer");
      }
    } else {
      socket.emit("playerTaken", player);
    }
  });

  socket.on("move", (data) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    const room = rooms[currentRoom];
    if (room.players[data.player]) {
      room.players[data.player].x = data.x;
      if (data.y !== undefined) room.players[data.player].y = data.y;
      if (data.screenHeight !== undefined)
        room.players[data.player].screenHeight = data.screenHeight;
      socket.to(currentRoom).emit("playersUpdate", room.players);
    }
  });

  socket.on("timeUp", () => {
    if (currentRoom) checkGameOver(currentRoom);
  });

  socket.on("disconnect", () => {
    if (currentRoom && rooms[currentRoom]) {
      const room = rooms[currentRoom];
      for (let p in room.players) {
        if (room.players[p].id === socket.id) delete room.players[p];
      }
      io.to(currentRoom).emit("playersUpdate", room.players);
    }
  });
});

server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
