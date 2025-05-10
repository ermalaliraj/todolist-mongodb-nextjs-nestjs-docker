#!/bin/bash

echo "=== GET ALL ==="
RESPONSE=$(curl -s -X GET http://localhost:5041/todolist)
echo "$RESPONSE"

COUNT=$(echo "$RESPONSE" | grep -o '"count":[0-9]*' | sed 's/[^0-9]*//')
echo "=>TODO LIST count: $COUNT"

echo -e "\n=== ADD NEW ==="
POST_RESPONSE=$(curl -s -X POST http://localhost:5041/todolist \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Food TodoList Bash Add",
    "description":"Scripted add",
    "isCompleted":"Tirane"
  }')
echo "$POST_RESPONSE"

POST_ID=$(echo "$POST_RESPONSE" | grep -oE '"(id|_id)"[[:space:]]*:[[:space:]]*"[^"]+"' | head -n1 | cut -d'"' -f4)
echo "=>NEW TODO Added: $POST_ID"

RESPONSE=$(curl -s -X GET http://localhost:5041/todolist)
COUNT=$(echo "$RESPONSE" | grep -o '"count":[0-9]*' | sed 's/[^0-9]*//')
echo "=>TODO LIST count after ADD: $COUNT"


echo -e "\n=== UPDATE ==="
PUT_RESPONSE=$(curl -s -X PUT http://localhost:5041/todolist/$POST_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"New title"}')
echo "$PUT_RESPONSE"
UPDATED_NAME=$(echo "$PUT_RESPONSE" | grep -oE '"title"[[:space:]]*:[[:space:]]*"[^"]+"' | head -n1 | cut -d'"' -f4)
echo "=>UPDATED TODO title: $UPDATED_NAME"

echo -e "\n=== DELETE ==="
DELETE_RESPONSE=$(curl -s -X DELETE http://localhost:5041/todolist/$POST_ID)
echo "$DELETE_RESPONSE"

RESPONSE=$(curl -s -X GET http://localhost:5041/todolist)
COUNT=$(echo "$RESPONSE" | grep -o '"count":[0-9]*' | sed 's/[^0-9]*//')
echo "=>TODO LIST count after delete: $COUNT"
