### Basic instructions 

# Build the app using node

* Go in the app folder and then run :

```
npm run start:dev
```
So now the app is running on localhost:3000

# Build the app using dokcer

* Go in the sondage folder
* Use : 
```
docker build ./app/build -t sapp
docker run -p 3243:3000 -v PATH/TO/THE/APP/FOLDER:/var/workspace/app sapp
```

Now the container should be running on the port 3243

You can access the app by browsing to localhost:3243