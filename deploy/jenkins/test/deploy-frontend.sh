#!/bin/bash

set -e

pwd
SRC_DIR=frontend
STAGE_DIR=/tmp/todolist
DEPLOY_DIR=/www/wwwroot/todolist-frontend
ZIP_NAME=todolist-frontend.tar.gz
SCRIPT_INSTALL=install-test.sh

# Exit if change is outside the interested project
BUILD_LOG_PATH="/var/lib/jenkins/jobs/todolist/jobs/$SRC_DIR/builds/$BUILD_NUMBER/log"
echo "BUILD_LOG_PATH: $BUILD_LOG_PATH"
BUILD_CAUSE=$(grep -i "Started by" "$BUILD_LOG_PATH" | head -n 1) # Searching this: "Started by user Ermal as frontend", to force build if Run fired by user and not by Push
CHANGED_FILES=$(git diff --name-only HEAD^1)
CHANGED_DIRECTORIES=$(echo "$CHANGED_FILES" | awk -F'/' '{print $1}' | sort -u)
CHANGED_PATHS=$(echo "$CHANGED_DIRECTORIES" | awk '{printf "/%s ", $0}')
echo "Change detected in folder: $CHANGED_PATHS, caused by: $BUILD_CAUSE"
if echo "$CHANGED_PATHS" | grep -qv "/$SRC_DIR" && echo "$BUILD_CAUSE" | grep -qv "user"; then
  echo "No changes detected in the '$SRC_DIR' folder. Exiting."
  exit 0
fi

# Stage files
echo "Creating zip $ZIP_NAME with content of folder '$SRC_DIR'"
tar cvzf $ZIP_NAME --exclude='.git' $SRC_DIR
echo "$ZIP_NAME created. Ready to be sent to the remote server: $(grep 'testServer' /etc/hosts | awk '{print $1}')"
ssh testServer mkdir -p $STAGE_DIR
ssh testServer sudo rm -rf $STAGE_DIR/$ZIP_NAME
scp -r $ZIP_NAME testServer:$STAGE_DIR
echo "Zip sent to the remote server: $(grep 'testServer' /etc/hosts | awk '{print $1}')$STAGE_DIR/$ZIP_NAME"

# Deploy
ssh testServer <<'ENDSSH'
set -e
if [ -f "/tmp/todolist/todolist-frontend.tar.gz" ]; then
    echo "Found file /tmp/todolist/todolist-frontend.tar.gz in the target server. Will start the deploy..."
    sudo rm -rf /www/wwwroot/todolist-frontend
    sudo mkdir -p /www/wwwroot/todolist-frontend
    sudo chown -R jenkins:jenkins /www/wwwroot/todolist-frontend
    mv /tmp/todolist/todolist-frontend.tar.gz /www/wwwroot/todolist-frontend
    cd /www/wwwroot/todolist-frontend
    echo "Exploding the tar file..."
    sudo tar xvzf todolist-frontend.tar.gz --strip-components 1
    sudo rm -f todolist-frontend.tar.gz
    chmod o+x docker-deploy.sh
    echo "STarting docker deploy..."
    bash docker-deploy.sh
    echo "✅ todolist-frontend deployed successfully."
else
    echo "File /tmp/todolist/todolist-frontend.tar.gz does not exist. Deploy didn't succeed. Old application version is still running!"
fi
ENDSSH