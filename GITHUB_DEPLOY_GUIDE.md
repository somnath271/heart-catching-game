# Step-by-Step: Upload to GitHub and Deploy

## Part 1: Upload to GitHub

### 1. Initialize Git (if not already done)

```bash
cd /Users/suman/Documents/Programming/projects/heart-game-react
git init
```

### 2. Create a GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Name it: `heart-catching-game` (or any name you like)
4. **Don't** initialize with README (you already have one)
5. Click "Create repository"

### 3. Add and Commit Your Files

```bash
# Add all files
git add .

# Commit with a message
git commit -m "Initial commit: Heart Catching Multiplayer Game"
```

### 4. Connect to GitHub and Push

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/heart-catching-game.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Part 2: Deploy Frontend to Vercel (Recommended)

### Step 1: Prepare Your Code

First, let's make the server URL configurable:

**Update `src/App.js`** - Line ~11:

```javascript
// Change from:
const socket = io("http://localhost:3000", {

// To:
const socket = io(process.env.REACT_APP_SERVER_URL || "http://localhost:3000", {
```

**Update `server.js`** - Change the port and CORS (already done):

```javascript
// At the top, after imports:
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3001";

// Update CORS section:
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

// At the bottom:
server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
```

### Step 2: Create Environment File

Create `.env` in root (for local development):

```bash
# .env
REACT_APP_SERVER_URL=http://localhost:3000
```

Update `.gitignore` to include:

```
.env
.env.production
```

### Step 3: Deploy Frontend on Vercel

1. Go to https://vercel.com → Import your GitHub repo
2. Framework: Create React App (auto)
3. Build: `npm install && npm run build`
4. Output: `build`
5. Environment Variables:
   - `REACT_APP_SERVER_URL` = `https://<your-fly-app>.fly.dev`
6. Deploy and copy your Vercel URL: `https://your-frontend.vercel.app`

## Part 3: Deploy Backend to Fly.io

### Step 1: Fly CLI Setup

```bash
brew install flyctl
fly auth signup   # or: fly auth login
```

### Step 2: Launch App (uses Dockerfile)

```bash
fly launch --no-deploy
# Choose app name, e.g., heart-game-server
```

### Step 3: Set CORS Origin and Deploy

```bash
# After your frontend (Vercel) is deployed
fly secrets set CLIENT_URL=https://your-frontend.vercel.app

# Optional: allow local dev too
fly secrets set CLIENT_URL="https://your-frontend.vercel.app, http://localhost:3001"

# Deploy
fly deploy
```

### Step 4: Test Your Deployed Game!

1. Open your frontend URL in two different browsers/tabs
2. Create a room in one
3. Join with the code in another
4. Play the game!

---

## Quick Commands Reference

### Git Commands:

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull
```

### Local Development:

```bash
# Terminal 1 - Start server
npm run server

# Terminal 2 - Start React app
PORT=3001 npm start
```

---

## Troubleshooting

### Issue: "CORS error"

- Make sure `CLIENT_URL` in backend matches your frontend URL exactly
- Include `https://` in the URL

### Issue: "WebSocket connection failed"

- Render free tier may take 30-60 seconds to wake up
- Try refreshing after waiting a minute

### Issue: "Application error"

- Check Render logs: Dashboard → Your Service → Logs tab
- Make sure all environment variables are set

### Issue: "Game not syncing"

- Clear browser cache
- Check that both players are using HTTPS version

---

## Alternative: Quick Deploy with One Click

If you want faster deployment, I can help you set up:

- **Vercel** (Frontend) - One-click deploy from GitHub
- **Railway** (Backend) - Auto-detects and deploys Node.js

Would you like me to create those config files instead?
