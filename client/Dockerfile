FROM node:12.16.3-alpine3.9
WORKDIR /usr/src/app
COPY package*.json .
COPY yarn.lock .
RUN yarn
COPY . .
CMD [ "yarn", "start" ]
