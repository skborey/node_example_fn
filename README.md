# Front End

http://isitopen-app.herokuapp.com/

`React` Application with `Redux` and other dependecies are used including:

- `js-cookie` to manage the session
- `axios` to serve on rest api to the server

# Project structure

```
+-- public
+-- src
|   +-- action        -> folder containing the gateway to indicate where to go (to server or reducer) and prepare data for that destination
|   +-- assets        -> folder style sheets for the whole application 
|   +-- components    -> folder containing all componnent of the applications that is sepearted to be 6 copomnents
|   +-- middleware    -> folder containing the process between action and reducer, it will call by action using for communicate to server, it is the one of two destination for action to call
|   +-- reducer       -> folder containing the final process of setup new state for application base on data is get from action,
|   --- App.js        -> initialize of structure of application UI, it strutures the components together
|   --- config.json   -> static config for application
|   --- index.js      -> initialize the application achitecture base on redux(setup store, connect reducer, ...)
|   --- serverWorker.js
|   --- setupTest.js
|---package-lock.json
|---package.json
```

# How to Start Server

## Prerequisite

- Install `NodeJs` to the machine

## Setup

1. Get project source

   > clone source code from github repository using command `git clone https://github.com/skborey/isitopen_frontend.git`
   
2. Install dependency libraries
   
   > go to root project root folder and run command `npm install` (all libraries is configured in package.json). Wait untill install is completed
   
3. Update config
  
   > go to two file in `config` folder to change `api endpoint` configuration base on backend server (https://github.com/skborey/isitopen_backend)

4. Start server

> Go to root folder fo project and run the command

```
npm start
```

The vist the application via `http://localhost:3000/`
