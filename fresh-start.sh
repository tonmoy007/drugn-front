#!/usr/bin/env sh
rm -rf node_modules
yarn install
watchman watch-del $(pwd) ; watchman watch-project $(pwd)
yarn start