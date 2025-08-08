#!/bin/bash

echo "🛑 Stopping Sangeet Restaurant Servers..."

# Stop backend server
echo "🔧 Stopping Backend Server..."
pkill -f "node src/index.js" 2>/dev/null

# Stop frontend server
echo "🎨 Stopping Frontend Server..."
pkill -f "react-scripts" 2>/dev/null

# Wait a moment
sleep 2

# Check if processes are still running
if pgrep -f "node src/index.js" > /dev/null; then
    echo "⚠️  Backend server still running, force stopping..."
    pkill -9 -f "node src/index.js" 2>/dev/null
fi

if pgrep -f "react-scripts" > /dev/null; then
    echo "⚠️  Frontend server still running, force stopping..."
    pkill -9 -f "react-scripts" 2>/dev/null
fi

echo "✅ All servers stopped!"
echo "📱 Frontend: http://localhost:3000 (stopped)"
echo "🔧 Backend: http://localhost:5001 (stopped)"
