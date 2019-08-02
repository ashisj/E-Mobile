# Mobile Store Application

## Project Setup
In package.json
```
    "client-install": "npm install --prefix client",
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
```
## Server site
1. npm init
2. npm i express body-parser cors concurrent
3. add two files (server.js, app.js)

## client
1. create-react-app client
