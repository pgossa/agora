#!/bin/sh

npm i react-scripts

#Install depencies
npm install 

#Start app
npm run start:dev

exec "$@"