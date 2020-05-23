This is a single-page app written using React + TypeScript + Material-UI for the frontend and Express + Mongoose for the backend

You may check the app at: https://kyle-pizza-app.netlify.app/

The backend API (enabled CORS for all origins) can be accessed here: https://pizza-app-server.herokuapp.com/api/orders

# Setting up

## Requirements

- [Node](https://nodejs.org/en/download/) - v12 or later
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)

## Optional

- [MongoDb](https://www.mongodb.com/download-center/community) (only if you want to run the code without Docker)

Download the repository

```
git clone https://github.com/janzkyle23/pizza-app.git
cd pizza-app
```

## Running with Docker

Run:

```
docker-compose up
```

This will run the frontend, backend and database in 3 separate Docker containers. If you want any changes in the code to reflect on the browser, simply re-build the services using:

```
docker-compose up --build
```

This will automatically detect only the services that have changed and re-build it.

## Running without Docker

To run client:

```
cd client
yarn start
```
Before running the server, change `proxy` value in client/package.json to http://localhost:3001

To run server (in a separate terminal from root directory):

```
cd server
yarn dev
```

Once the server runs, it will automatically create a local MongoDb database.

**Note**: Make sure you have MongoDB installed.
