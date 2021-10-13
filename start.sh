#!/bin/bash

cd /deploy/mymap/server

# pm2 set pm2-slack:slack_url 
# pm2 set pm2-slack:servername mymap
# pm2 set pm2-slack:start true
# pm2 set pm2-slack:stop true
# pm2 set pm2-slack:restart true
pm2-runtime start ./dist/src/main.js