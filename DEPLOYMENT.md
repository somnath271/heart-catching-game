# 🚀 Deployment Guide

## Hosting Options for Your Heart Catching Game

Your game has two parts that need hosting:

1. **Backend Server** (Node.js/Socket.IO) - Port 3000
2. **Frontend React App** - Port 3001 (development)

### Best Hosting Options

---

## Option 1: Render.com (Recommended - FREE)

**Pros**: Free tier, easy setup, supports WebSockets
**Steps**:

### Deploy Backend Server:

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `heart-game-server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
5. Add Environment Variable:
   - Key: `PORT`
   - Value: `3000`
6. Click "Create Web Service"
7. Note your backend URL: `https://heart-game-server.onrender.com`

### Deploy Frontend:

1. Click "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name**: `heart-game-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Plan**: Free
4. Click "Create Static Site"

### Update CORS in server.js:

```javascript
const io = new Server(server, {
  cors: {
    origin: "https://heart-game-frontend.onrender.com", // Your frontend URL
    methods: ["GET", "POST"],
  },
});
```

### Update Socket connection in src/App.js:

```javascript
const socket = io("https://heart-game-server.onrender.com", {
  transports: ["websocket", "polling"],
  reconnection: true,
});
```

---

## Option 2: Railway.app (Easy - FREE tier available)

**Pros**: Simple deployment, automatic HTTPS
**Steps**:

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js
6. Add these environment variables:
   - `PORT=3000`
7. Get your deployment URL
8. Update CORS and socket URLs as shown above

---

## Option 3: Heroku (Popular but paid)

**Note**: Heroku no longer has a free tier
**Monthly Cost**: ~$7/month

### Steps:

1. Install Heroku CLI: `brew install heroku/brew/heroku`
2. Login: `heroku login`
3. Create app: `heroku create heart-game`
4. Add Procfile in root:

```
web: node server.js
```

5. Deploy:

```bash
git push heroku main
```

6. Update CORS and socket URLs with your Heroku URL

---

## Option 4: Vercel (Frontend) + Render (Backend)

**Frontend on Vercel** (Free):

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects React
4. Deploy with one click

**Backend on Render** (see Option 1)

## Option 4: Vercel (Frontend) + Fly.io (Backend) — Recommended for you

This combo gives you a fast static frontend and a reliable Node server with WebSockets.

### Frontend on Vercel (Free)

1. Go to https://vercel.com and import your GitHub repo
2. Framework preset: Create React App (auto-detected)
3. Build Command: `npm install && npm run build`
4. Output Directory: `build`
5. Environment Variable:
   - `REACT_APP_SERVER_URL` = `https://<your-fly-app>.fly.dev`
6. Deploy. You’ll get a URL like `https://your-frontend.vercel.app`

### Backend on Fly.io (Free tier available)

1. Install Fly CLI: `brew install flyctl`
2. Login: `fly auth signup` or `fly auth login`
3. In project root (this repo):
   - `fly launch --no-deploy` (accept Dockerfile, choose app name e.g. `heart-game-server`)
   - Edit `fly.toml` if needed (already included)
4. Set environment variable for CORS:
   - `fly secrets set CLIENT_URL=https://your-frontend.vercel.app`
5. Deploy backend:
   - `fly deploy`
6. After deploy, note your backend URL: `https://<your-fly-app>.fly.dev`

### Finalize

1. In Vercel project settings, update `REACT_APP_SERVER_URL` with your Fly URL
2. Redeploy frontend
3. (Optional) In Fly, add localhost for dev:
   - `fly secrets set CLIENT_URL="https://your-frontend.vercel.app, http://localhost:3001"`

---

## Option 5: Self-Hosting (VPS like DigitalOcean)

**Cost**: ~$5/month
**Requires**: Linux knowledge, domain name

### Quick Setup:

1. Get a VPS (DigitalOcean, Linode, AWS EC2)
2. Install Node.js on server
3. Clone your repo
4. Install dependencies: `npm install`
5. Use PM2 to keep server running:

```bash
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

6. Setup nginx as reverse proxy
7. Get free SSL with Let's Encrypt

---

## Recommended: Render.com Setup

I recommend **Render.com** because:

- ✅ Free tier available
- ✅ WebSocket support (needed for Socket.IO)
- ✅ Automatic HTTPS
- ✅ Easy GitHub integration
- ✅ Good uptime

### Important Configuration Changes Needed:

Before deploying, you need to:

1. **Make server URL configurable** (I'll help you with this)
2. **Update CORS settings** with your production domain
3. **Build the React app** for production
4. **Set environment variables** for different environments

Would you like me to update your code to support easy deployment to Render or another platform?
