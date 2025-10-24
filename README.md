# ❤️ Heart Catching Multiplayer Game - React Edition

A fun real-time multiplayer heart-catching game built with **React**, **Tailwind CSS**, **Socket.IO**, and **Node.js**.

## 🎮 Features

- **Host-Controlled Game Modes**: Room creator chooses between Timer or Target mode
- **Multiplayer Room System**: Create or join rooms with unique 6-digit codes
- **Two Game Modes**:
  - ⏱️ **5-Minute Timer Mode**: Catch as many hearts as possible in 5 minutes
  - 🎯 **Target Mode**: First to catch 50 hearts wins
- **Real-time Synchronization**: Both players see the same hearts falling
- **Beautiful Heart Shapes**: Custom-drawn hearts with glossy effects
- **Smooth Controls**: Responsive keyboard (Arrow keys/A/D) and mobile touch controls
- **Automatic Player Assignment**: Joiners automatically follow the host's game mode
- **Mobile & Desktop Support**: Fully responsive design

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Install dependencies**:

```bash
cd heart-game-react
npm install
```

2. **Install additional server dependencies**:

```bash
npm install express socket.io
```

## 🎯 How to Run

### Start the Server (Terminal 1)

```bash
node server.js
```

Server will run on `http://localhost:3000`

### Start the React App (Terminal 2)

```bash
npm start
```

React app will run on `http://localhost:3001` (or next available port)

## 🎲 How to Play

### For Player 1 (Host):

1. Open the app in your browser
2. Click **"Create New Room"**
3. Share the 6-digit room code with Player 2
4. **Choose a game mode** (⏱️ Timer or 🎯 Target) - Only the host can choose!
5. Select **"Player 1 ❤️"** or **"Player 2 💙"**
6. Wait for Player 2 to join

### For Player 2 (Guest):

1. Open the app in your browser
2. Enter the room code from Player 1
3. Click **"Join Room"**
4. Wait for host to choose game mode (automatic)
5. Select your player (the one not taken by host)
6. Game starts automatically when both players are ready!

### Controls:

- **Keyboard**: Use `A`/`←` to move left, `D`/`→` to move right
- **Mobile**: Use the on-screen arrow buttons

## 📁 Project Structure

```
heart-game-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── GameCanvas.js        # Main game canvas with hearts & catching bars
│   │   ├── RoomSelection.js     # Create/Join room interface
│   │   ├── GameModeSelection.js # Choose timer or target mode
│   │   ├── PlayerSelection.js   # Select Player 1 or 2
│   │   ├── GameOver.js          # End game results screen
│   │   ├── Scoreboard.js        # Live score display
│   │   └── MobileControls.js    # Touch controls for mobile
│   ├── App.js                   # Main app component
│   ├── index.js                 # React entry point
│   └── index.css                # Tailwind CSS imports
├── server.js                    # Socket.IO multiplayer server
├── package.json
└── tailwind.config.js

```

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Socket.IO**: Real-time bidirectional communication
- **HTML5 Canvas**: For rendering hearts and catching bars
- **Express**: Node.js web server

## 🌟 Key Features Explained

### Room System

Each game session has a unique 6-character room code. Multiple pairs can play simultaneously without interference.

### Synchronized Gameplay

All hearts are spawned and controlled by the server at 60 FPS, ensuring both players see identical gameplay.

### Heart Drawing

Hearts are drawn using Bezier curves with:

- Realistic heart shape
- Glossy highlight effect
- Smooth animations

### Collision Detection

Server-side collision detection ensures fair gameplay and prevents cheating.

## 📝 License

MIT License - Feel free to use this project for learning or fun!

## 🤝 Contributing

Feel free to fork this project and add your own features!

## 🚀 Deployment

### Quick Deploy to Production

See detailed guides:

- **[GITHUB_DEPLOY_GUIDE.md](./GITHUB_DEPLOY_GUIDE.md)** - Step-by-step GitHub upload and deployment
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - All hosting options explained

Recommended setup:

- Frontend: Vercel (Create React App static build)
- Backend: Fly.io (Node/Socket.IO with WebSockets)

See:

- [GITHUB_DEPLOY_GUIDE.md](./GITHUB_DEPLOY_GUIDE.md) – Vercel + Fly.io steps
- [DEPLOYMENT.md](./DEPLOYMENT.md) – All options (Render, Railway, Vercel + Fly)

### Environment Variables

**Backend** (server.js):

- `PORT` - Server port (default: 3000)
- `CLIENT_URL` - Frontend URL(s) for CORS; supports comma-separated list
  - Example: `CLIENT_URL="https://your-frontend.vercel.app, http://localhost:3001"`

**Frontend** (React):

- `REACT_APP_SERVER_URL` - Backend server URL (default: http://localhost:3000)

## 🎉 Have Fun!

Enjoy playing with your friends! ❤️💙

---

Made with ❤️ using React, Socket.IO, and lots of hearts!
