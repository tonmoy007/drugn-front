#!/usr/bin/env sh
git pull
set -a # automatically export all variables
source "$(pwd)/.env"
set +a
docker build --no-cache --label drugn -t drugn:latest .
docker rm -f drugn
docker run -p ${PORT}:19006 -d -v /etc/sysctl.conf:/etc/sysctl.conf -v "$(pwd)/external/expo-camera/build:/app/node_modules/expo-camera/build" --name drugn drugn
docker rmi $(docker images -f dangling=true -q)
