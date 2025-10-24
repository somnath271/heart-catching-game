# ❤️ Heart Catching Multiplayer Game

A fun real-time multiplayer heart-catching game built with **React**, **Tailwind CSS**, **Socket.IO**, and **Node.js**.

🎮 **[Play Now →](https://heart-catching-game.vercel.app/)**

## 🎮 Features

- **Host-Controlled Game Modes**: Room creator chooses between Timer or Target mode
- **Multiplayer Room System**: Create or join rooms with unique 6-digit codes
- **Two Game Modes**:
  - ⏱️ **5-Minute Timer Mode**: Catch as many hearts as possible in 5 minutes
  - 🎯 **Target Mode**: First to catch 50 hearts wins
- **Real-time Synchronization**: Both players see the same hearts falling via Socket.IO
- **Beautiful Heart Shapes**: Custom-drawn hearts with glossy effects on HTML5 Canvas
- **Smooth Controls**: Responsive keyboard (Arrow keys/A/D) and mobile touch controls
- **Automatic Player Assignment**: Joiners automatically follow the host's game mode
- **Mobile & Desktop Support**: Fully responsive design

## 🚀 Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup & Run

1. **Clone and install dependencies**:

```bash
git clone https://github.com/somnath271/heart-catching-game.git
cd heart-catching-game
npm install
```

2. **Start the backend server** (Terminal 1):

```bash
npm run server
```

Server runs on `http://localhost:3000`

3. **Start the React app** (Terminal 2):

```bash
PORT=3001 npm start
```

React app runs on `http://localhost:3001`

4. **Play locally**: Open two browser tabs at `http://localhost:3001` and test!

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

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, HTML5 Canvas
- **Backend**: Node.js, Express, Socket.IO
- **Deployment**: Vercel (frontend) + Railway (backend)
- **Real-time Communication**: WebSockets via Socket.IO

## 🚀 Deployment

This project is deployed and live at:
- **Frontend**: [Vercel](https://heart-catching-game.vercel.app/)
- **Backend**: Railway (auto-deploys from GitHub)

### Deploy Your Own

**Frontend (Vercel):**
1. Fork this repo
2. Import to Vercel from GitHub
3. Set environment variable: `REACT_APP_SERVER_URL` = your Railway backend URL
4. Deploy

**Backend (Railway):**
1. Install Railway CLI: `npm install -g @railway/cli`
2. Run: `railway login` then `railway init`
3. Deploy: `railway up`
4. Set variable: `railway variables set CLIENT_URL=your-vercel-url`

### Environment Variables

**Backend** (`server.js`):
- `PORT` - Server port (default: 3000, Railway sets this automatically)
- `CLIENT_URL` - Frontend URL(s) for CORS (supports comma-separated list)
  - Example: `"https://your-app.vercel.app, http://localhost:3001"`

**Frontend** (React):
- `REACT_APP_SERVER_URL` - Backend server URL (default: `http://localhost:3000`)

## 📝 License

MIT License - Feel free to use this project for learning or fun!

## � Acknowledgments

Built with ❤️ using React, Socket.IO, and lots of hearts!

---

**[Play the game now →](https://heart-catching-game.vercel.app/)**
