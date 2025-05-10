#!/bin/bash

set -e

echo "Stopping todolist-frontend container..."
docker stop todolist-frontend || true
echo "Removing todolist-frontend container..."
docker rm todolist-frontend || true
echo "Removing todolist-frontend image..."
docker rmi todolist-frontend:latest || true

echo "Building new image..."
# docker compose build --no-cache
docker compose up -d --build
