#!/bin/bash

echo "🎮 Heart Catching Game - GitHub Upload & Deploy Helper"
echo "======================================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📋 Current Git Status:"
git status --short

echo ""
echo "==================== NEXT STEPS ===================="
echo ""
echo "1️⃣  CREATE GITHUB REPOSITORY:"
echo "   → Go to: https://github.com/new"
echo "   → Name: heart-catching-game"
echo "   → Don't initialize with README"
echo "   → Click 'Create repository'"
echo ""
echo "2️⃣  ADD & COMMIT FILES:"
echo "   Run: git add ."
echo "   Run: git commit -m \"Initial commit: Heart Catching Game\""
echo ""
echo "3️⃣  PUSH TO GITHUB:"
echo "   Replace YOUR_USERNAME with your GitHub username:"
echo "   Run: git remote add origin https://github.com/YOUR_USERNAME/heart-catching-game.git"
echo "   Run: git branch -M main"
echo "   Run: git push -u origin main"
echo ""
echo "4️⃣  DEPLOY TO RENDER:"
echo "   → See: GITHUB_DEPLOY_GUIDE.md for detailed steps"
echo "   → Backend: https://render.com → New Web Service"
echo "   → Frontend: https://render.com → New Static Site"
echo ""
echo "=================================================="
echo ""
echo "📖 For detailed instructions, check:"
echo "   • GITHUB_DEPLOY_GUIDE.md - Step-by-step guide"
echo "   • DEPLOYMENT.md - All hosting options"
echo ""
