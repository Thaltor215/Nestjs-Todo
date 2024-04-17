TODO APPLICATION

Description:
This project is a basic Todo crud application.
It leverages Docker for easy deployment and management.

NOTE:
To run the application, make sure you have Docker and NestJS cli installed on your system.

Application PORTS:

- server: 5001
- client: 3000
- db: 5432

To setup Nestjs cli for the first time (if you do not have it) run the following in your terminal:
npm i -g @nestjs/cli

Let's install oour packages.

- For client enter the following commands from your root directory:
  - cd client/
  - npm i

-for server enter the following commands from your root directory: - cd server/ - npm i

Once done with the above, navigate back to your root directory and following the options below:

To run the application with MAKE commands:

- make all: Builds and starts the application.

There are also additional commands to perform individual actions

- make pull: Pulls the necessary dependencies.
- make build: Builds the Docker images.
- make up: Starts the Docker containers in detached mode.
- make down: Stops the running Docker containers.
- make logs-server: Displays logs for the NestJS server.

If you are not able to use MAKE commands here are the docker actions to build and start the application:

- docker compose build
- docker compose up -d

Once the container is up and running, you can access the client via http://localhost:3000.

- NOTE: If you have had anything running on port 3000 please clear your local data to prevent issues from previous applications.

From there you can login by using the TestUser credentials:

- username: testuser
- password: testpassword

To run Unit tests for the Todo service please run the following commands:

- cd server/
  - npm run test
