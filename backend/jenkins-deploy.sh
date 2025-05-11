#!/bin/bash

set -e

pwd
SRC_DIR=backend
STAGE_DIR=/tmp/todolist
DEPLOY_DIR=/www/wwwroot/todolist/backend
ZIP_NAME=backend.gz
SCRIPT_INSTALL=docker-deploy.sh

# Exit if change is outside the interested project
JOB_NAME_SHORT=$(echo "$JOB_NAME" | cut -d'/' -f1) # extracts the main project name
BUILD_LOG_PATH="/var/lib/jenkins/jobs/${JOB_NAME_SHORT}/jobs/$SRC_DIR/builds/$BUILD_NUMBER/log"
echo "BUILD_LOG_PATH: $BUILD_LOG_PATH"
BUILD_CAUSE=$(grep -i "Started by" "$BUILD_LOG_PATH" | head -n 1) # Searching this: "Started by user Ermal as Admin", to force build if Run fired by user and not by Push
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
if [ -f "/tmp/todolist/backend.gz" ]; then
    echo "Found file /tmp/todolist/backend.gz in the target server. Will start the deploy..."
    sudo rm -rf /www/wwwroot/todolist/backend
    sudo mkdir -p /www/wwwroot/todolist/backend
    sudo chown -R jenkins:jenkins /www/wwwroot/todolist/backend
    mv /tmp/todolist/backend.gz /www/wwwroot/todolist/backend
    cd /www/wwwroot/todolist/backend
    echo "Exploding the tar file..."
    sudo tar xvzf backend.gz --strip-components 1
    sudo rm -f backend.gz
    chmod o+x docker-deploy.sh
    echo "Starting docker deploy..."
    sudo bash docker-deploy.sh
    echo "✅ todolist-backend deployed successfully."
else
    echo "File /tmp/todolist/backend.gz does not exist. Deploy didn't succeed. Old application version is still running!"
fi
ENDSSH