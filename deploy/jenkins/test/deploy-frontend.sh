#!/bin/bash

set -e

pwd
SRC_DIR=.
STAGE_DIR=/tmp/todolist
DEPLOY_DIR=/www/wwwroot/todolist-frontend
ZIP_NAME=todolist-frontend.tar.gz
SCRIPT_INSTALL=install-test.sh

# Stage files
echo "Creating zip $ZIP_NAME with content of folder '$SRC_DIR'"
tar cvzf $ZIP_NAME --exclude='.git' --exclude='todolist-frontend.tar.gz' $SRC_DIR
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
    sudo tar xvzf todolist-frontend.tar.gz --strip-components 1
    sudo rm -f todolist-frontend.tar.gz
    echo "✅ todolist-frontend deployed successfully."
else
    echo "File /tmp/todolist/todolist-frontend.tar.gz does not exist. Deploy didn't succeed. Old application version is still running!"
fi
ENDSSH