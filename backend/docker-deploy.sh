#!/bin/bash

set -e

IMAGE_NAME="todolist-backend"
IMAGE_VERSION="latest"

echo "Stopping ${IMAGE_NAME} container..."
docker stop ${IMAGE_NAME} || true
echo "Removing ${IMAGE_NAME} container..."
docker rm ${IMAGE_NAME} || true
echo "Removing ${IMAGE_NAME} image..."
docker rmi ${IMAGE_NAME}:${IMAGE_VERSION} || true

echo "Building new ${IMAGE_NAME}:${IMAGE_VERSION} image..."
docker compose up -d --build
