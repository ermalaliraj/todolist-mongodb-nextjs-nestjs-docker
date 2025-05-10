#!/bin/bash

set -e

IMAGE_NAME="mongo"
IMAGE_VERSION="8.0.9"

echo "Stopping mongo container..."
docker stop ${IMAGE_NAME} || true
echo "Removing ${IMAGE_NAME} container..."
docker rm ${IMAGE_NAME} || true
echo "Removing ${IMAGE_NAME} image..."
docker rmi ${IMAGE_NAME}:${IMAGE_VERSION} || true

echo "Building new image..."
docker compose up -d
