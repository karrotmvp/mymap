#!/bin/bash

DOCKER_APP_NAME=mymap

EXIST_BLUE=$(docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yml ps | grep Up)

if [ -z "$EXIST_BLUE" ]; then
    echo "blue up"
    
    docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yml up -d
    
    sleep 20

    RES_CODE=$(curl -o /dev/null -w "%{http_code}" "localhost:5001")

    if [ $RES_CODE -eq 200 ]; then
        docker-compose -p ${DOCKER_APP_NAME}-green -f docker-compose.green.yml down
    else
        docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yml down
    fi

else
    echo "green up"
    
    docker-compose -p ${DOCKER_APP_NAME}-green -f docker-compose.green.yml up -d
    
    sleep 20

    RES_CODE=$(curl -o /dev/null -w "%{http_code}" "localhost:5002")

    if [ $RES_CODE -eq 200 ]; then
        docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yml down
    else
        docker-compose -p ${DOCKER_APP_NAME}-green -f docker-compose.green.yml down
    fi

fi