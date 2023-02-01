#!/usr/bin/env sh
git pull
docker build --no-cache --label drugn -t drugn:latest .
docker rm -f drugn
docker run -p 80:19006 -d -v /etc/sysctl.conf:/etc/sysctl.conf --name drugn drugn
docker rmi $(docker images -f dangling=true -q)
