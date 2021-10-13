#!/bin/bash

cd ./server
npm install

cp -rf /home/ubuntu/.env /home/ubuntu/deploy/mymap/server

./deploy.sh > /dev/null 2> /dev/null < /dev/null &
