### Basic instructions 

# Build the API using node

* Go in the api folder and then run :

```
npm run start
```
Now the api is running on localhost:3000

# Build the API using docker

* Go in the sondage folder
* Use : 
```
docker build ./api/build -t sapi
docker run -p 3546:3000 -v PATH/TO/THE/API/FOLDER:/var/workspace/api sapi
```

Now the container should be running on the port 3546

You can access the API by browsing to localhost:3546