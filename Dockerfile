FROM node:14.18

MAINTAINER rudy <rudy@daangn.com>

VOLUME /deploy/mymap

RUN npm install -g @nestjs/cli && npm install -g pm2

COPY ./start.sh /usr/local/bin

RUN ln -s /usr/local/bin/start.sh /start.sh

CMD ["start.sh"]