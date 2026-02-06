#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🧪 Starting E2E Tests with Playwright...${NC}\n"

# Start backend in background
echo -e "${YELLOW}🚀 Starting backend server...${NC}"
cd /workspaces/avante/backend
npm start --silent 2>/dev/null &
BACKEND_PID=$!

# Wait for backend to be ready
echo "⏳ Waiting for backend to be ready..."
sleep 8

# Check if backend is running
if ! kill -0 $BACKEND_PID 2>/dev/null; then
  echo -e "${RED}❌ Backend failed to start${NC}"
  exit 1
fi

# Run Playwright tests
cd /workspaces/avante
echo -e "${YELLOW}📝 Running Playwright E2E tests...${NC}\n"
npx playwright test --reporter=html,list

TEST_RESULT=$?

# Cleanup
echo -e "\n${YELLOW}🧹 Cleaning up...${NC}"
kill $BACKEND_PID 2>/dev/null || true

# Report results
if [ $TEST_RESULT -eq 0 ]; then
  echo -e "${GREEN}✅ All E2E tests passed!${NC}"
else
  echo -e "${RED}❌ Some E2E tests failed${NC}"
  echo -e "${YELLOW}📊 View test results at: /workspaces/avante/playwright-report/index.html${NC}"
fi

exit $TEST_RESULT
