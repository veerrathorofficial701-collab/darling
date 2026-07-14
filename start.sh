#!/bin/bash
echo "Starting backend..."
cd "$(dirname "$0")/backend" && node index.js &
BACKEND_PID=$!

echo "Starting React app..."
cd "$(dirname "$0")" && npm start &
REACT_PID=$!

echo ""
echo "✅ Backend API:    http://localhost:4000"
echo "✅ Admin Panel:    http://localhost:4001"
echo "✅ Website:        http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop everything."

trap "kill $BACKEND_PID $REACT_PID 2>/dev/null" EXIT
wait
