#!/bin/bash

set -e

echo "Current working directory: $(pwd), content: "
ls -lah
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "PM2 version: $(pm2 -v || echo 'PM2 not found')"

rm -rf node_modules
rm -f package-lock.json

echo "Installing app ..........."
npm install --force || {
  echo "❌ Error: npm install failed"
  exit 1
}

pwd
ls -l
echo "Building app ..........."
npm run build-test || {
  echo "❌ Error: npm run build-test failed"
  exit 1
}

echo "Restart PM2 "
pm2 delete todolist-frontend:5040 || true  # Ignore errors if process doesn't exist
pm2 start npm --name "todolist-frontend:5040" -- run start-test || {
  echo "❌ Error: pm2 start failed"
  exit 1
}
