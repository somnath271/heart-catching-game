#!/bin/bash

echo "🎮 Starting Heart Catching Game..."
echo ""
echo "Starting server on port 3000..."

# Start the server in the background
node server.js &
SERVER_PID=$!

echo "Server started with PID: $SERVER_PID"
echo ""
echo "Waiting 2 seconds for server to initialize..."
sleep 2

echo ""
echo "Starting React app..."
echo "React app will open on http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both server and app"
echo ""

# Start React app (this will block)
npm start

# When React app is stopped, kill the server
kill $SERVER_PID
echo ""
echo "🎮 Game stopped. Thanks for playing!"
