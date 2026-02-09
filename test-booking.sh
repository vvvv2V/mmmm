#!/bin/bash
set -e

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk5LCJlbWFpbCI6InRlc3RlQGV4YW1wbGUuY29tIiwicm9sZSI6ImNsaWVudCIsIm5hbWUiOiJUZXN0ZSBVc2VyIiwiaWF0IjoxNzcwNTkxMTMzLCJleHAiOjE3NzA2Nzc1MzN9.NaZH29Th2svbyFniTxvpodzLLab9SfO6TXG29NMsvrk"

echo "1. Testing Booking Creation..."
RESPONSE=$(curl -s -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"userId":999,"serviceId":1,"date":"2026-02-20","time":"14:00","address":"Rua Teste, 123","phone":"5198888888","durationHours":2}' \
  --max-time 10)

echo "$RESPONSE"

# Check if booking was created
if echo "$RESPONSE" | grep -q '"id"'; then
  echo ""
  echo "✓ BOOKING CREATED SUCCESSFULLY!"
else
  echo ""
  echo "✗ BOOKING CREATION FAILED"
fi
