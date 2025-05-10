#!/bin/bash

set -e

IMAGE_NAME="kibana"
IMAGE_VERSION="7.17.9"

echo "Stopping mongo container..."
docker stop ${IMAGE_NAME} || true
echo "Removing ${IMAGE_NAME} container..."
docker rm ${IMAGE_NAME} || true
echo "Removing ${IMAGE_NAME} image..."
docker rmi ${IMAGE_NAME}:${IMAGE_VERSION} || true

echo "Building new ${IMAGE_NAME}:${IMAGE_VERSION} image..."
docker compose up -d

docker ps
