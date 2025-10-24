## 🚀 QUICK START: Upload to GitHub & Deploy

### ⚡ Fast Track Commands

```bash
# 1. Initialize and commit
git init
git add .
git commit -m "Initial commit: Heart Catching Game"

# 2. Create repo on GitHub.com, then:
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/heart-catching-game.git
git branch -M main
git push -u origin main
```

### 🌐 Deploy on Render.com (FREE)

**Backend Server:**

1. Go to https://render.com → Sign up
2. New + → Web Service → Connect GitHub repo
3. Settings:
   - Name: `heart-game-server`
   - Build: `npm install`
   - Start: `node server.js`
   - Add env var: `CLIENT_URL` = `https://YOUR-FRONTEND.onrender.com`

**Frontend App:**

1. New + → Static Site → Same GitHub repo
2. Settings:
   - Name: `heart-game-frontend`
   - Build: `npm install && npm run build`
   - Publish: `build`
   - Add env var: `REACT_APP_SERVER_URL` = `https://YOUR-BACKEND.onrender.com`

**Done!** Your game is live at: `https://YOUR-FRONTEND.onrender.com`

### 📝 Files Created

✅ `.env` - Local environment config
✅ `.gitignore` - Updated to exclude sensitive files
✅ `GITHUB_DEPLOY_GUIDE.md` - Detailed step-by-step guide
✅ `DEPLOYMENT.md` - All hosting options
✅ `setup-deploy.sh` - Helper script
✅ Updated `server.js` - Now uses environment variables
✅ Updated `src/App.js` - Now uses environment variables
✅ Updated `README.md` - Complete documentation

### 🎯 Your Game is Now:

✅ Ready for GitHub
✅ Ready for deployment
✅ Environment-aware (dev/production)
✅ Properly configured CORS
✅ Well documented

### 🆘 Need Help?

Check the detailed guides:

- **GITHUB_DEPLOY_GUIDE.md** - Every step explained
- **DEPLOYMENT.md** - Alternative hosting options

### 💡 Pro Tips

- Render free tier: Apps sleep after 15 min idle (takes ~30s to wake)
- Use Railway.app for instant wake-up (also has free tier)
- Keep your `.env` file secret - it's in `.gitignore`
- Test locally before deploying: `npm run server` + `PORT=3001 npm start`

---

**Ready to go live?** Follow GITHUB_DEPLOY_GUIDE.md step by step! 🚀
