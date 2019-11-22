#!/bin/sh

#Install depencies
npm install 

#Start server
npm run start:dev &

#Wait for the server to be running
sleep 10s

#Run the api
npm run start

exec "$@"