#!/bin/bash

cd /home/ubuntu/deploy/mymap/server
npm install
cd /home/ubuntu/deploy/mymap

cp -rf /home/ubuntu/.env /home/ubuntu/deploy/mymap/server
cp -rf /home/ubuntu/regionId.json /home/ubuntu/deploy/mymap/server

aws ecr get-login --no-include-email --region ap-northeast-2 > ./ecr-login
chmod +x ./ecr-login
./ecr-login

./redis.sh > ./redis.log
./deploy.sh > ./deploy-log.log
./deploy_worker.sh > ./deploy-worker-log.log
