#!/usr/bin/env sh
git pull
set -a # automatically export all variables
source .env
set +a
docker build --no-cache --label drugn -t drugn:latest .
docker rm -f drugn
docker run -p ${PORT}:19006 -d -v /etc/sysctl.conf:/etc/sysctl.conf --name drugn drugn
docker rmi $(docker images -f dangling=true -q)
