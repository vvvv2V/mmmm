#!/bin/bash

# Start backend in background
echo "🚀 Starting backend server..."
cd /workspaces/avante/backend
npm start --silent &
BACKEND_PID=$!
sleep 8

# Run Cypress headless
echo "🧪 Running Cypress E2E tests..."
cd /workspaces/avante/frontend
npx cypress run --headless --browser chrome

# Cleanup
kill $BACKEND_PID 2>/dev/null || true

echo "✅ E2E test run complete"
