#!/bin/bash

cd ./server
npm install
cd ..

cp -rf /home/ubuntu/.env /home/ubuntu/deploy/mymap/server
cp -rf /home/ubuntu/regionId.json /home/ubuntu/deploy/mymap/server
aws ecr get-login --no-include-email --region ap-northeast-2 > ./ecr-login
chmod +x ./ecr-login
./ecr-login

./deploy.sh > /dev/null 2> /dev/null < /dev/null &
