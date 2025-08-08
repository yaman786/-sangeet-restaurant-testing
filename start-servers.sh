#!/bin/bash

echo "🚀 Starting Sangeet Restaurant Servers..."

# Kill any existing processes
echo "🔄 Stopping existing servers..."
pkill -f "node src/index.js" 2>/dev/null
pkill -f "react-scripts" 2>/dev/null
sleep 2

# Start backend server
echo "🔧 Starting Backend Server (Port 5001)..."
cd backend && npm start > ../backend.log 2>&1 &
BACKEND_PID=$!

# Start frontend server
echo "🎨 Starting Frontend Server (Port 3000)..."
(cd frontend && npm start > ../frontend.log 2>&1) &
FRONTEND_PID=$!

# Wait for servers to start
echo "⏳ Waiting for servers to start..."
sleep 10

# Check if servers are running
echo "✅ Checking server status..."

# Check backend
if curl -s http://localhost:5001/api/health > /dev/null; then
    echo "✅ Backend Server: RUNNING (Port 5001)"
else
    echo "❌ Backend Server: FAILED"
fi

# Check frontend
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend Server: RUNNING (Port 3000)"
else
    echo "❌ Frontend Server: FAILED"
fi

echo ""
echo "🎉 Servers are running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5001"
echo ""
echo "📋 To stop servers: ./stop-servers.sh"
echo "📋 To view logs: tail -f backend.log or tail -f frontend.log"
echo ""
echo "💡 Keep this terminal open to keep servers running"
echo "💡 Or use 'nohup ./start-servers.sh &' to run in background"
