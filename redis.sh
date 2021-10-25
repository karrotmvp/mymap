#!/bin/bash

DOCKER_APP_NAME=redis

EXIST=$(docker-compose -p ${DOCKER_APP_NAME}-blue -f redis-server.yml ps | grep Up)

if [ -z "$EXIST" ]; then
    echo "redis up"
    
    docker-compose -p ${DOCKER_APP_NAME} -f redis-server.yml up -d

fi