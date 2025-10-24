  socket.on("joinRoom", (roomId) => {
    if (rooms[roomId]) {
      currentRoom = roomId;
      socket.join(roomId);
      socket.emit("roomJoined", {
        roomId: roomId,
        gameMode: rooms[roomId].gameMode,
        hasGameMode: rooms[roomId].gameMode !== null
      });
      socket.emit("heartsUpdate", rooms[roomId].hearts);
      socket.emit("playersUpdate", rooms[roomId].players);
      console.log(\`Player joined room: \${roomId}\`);
    } else {
      socket.emit("roomNotFound");
    }
  });
