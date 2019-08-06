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

In client/ package.json
```
"proxy" : "http://localhost:6000"
```
## Server site
1. npm init
2. npm i express body-parser cors concurrent dotenv mongoose
3. add two files (server.js, app.js)
4. added .env file

## client
1. npx create-react-app client
2. added proxy to client/package.json
