## 1. Choice of Base Image
 The base image used to build the containers is `node:16-alpine3.16`. This image is derived from the Alpine Linux distribution, making it lightweight and compact. Additionally, it includes Node.js version 16, which exceeds the version required by the application.
 Used 
 1. Client:`alpine:latest AS builder`
 2. Backend: `node:16-alpine3.16`
 3.Mongo : `mongo:6.0 `
       

## 2. Dockerfile directives used in the creation and running of each container.
 I used two Dockerfiles. One for the Client and the other one for the Backend.

**Client Dockerfile**

```
# Stage 1: Builder - Install dependencies
FROM alpine:latest AS builder

# Install Node.js
RUN apk add --no-cache nodejs npm

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Stage 2: Build1 - Build the application
FROM builder AS build1

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 3: Build2 - Use a lightweight Node.js image to run the application
FROM alpine:latest AS build2

# Install Node.js
RUN apk add --no-cache nodejs npm

# Set working directory
WORKDIR /app

# Copy only the built application from the previous stage
COPY --from=build1 /app ./

# Expose port (can be adjusted based on your application)
EXPOSE 3000

# Start the application (modify based on your start script)
CMD [ "npm", "start" ]


```
**Backend Dockerfile**

```
# Set base image
FROM node:16-alpine3.16

# Set the working directory
WORKDIR /backend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies and clears the npm cache and removes any temporary files
RUN npm install --only=production && \
    npm cache clean --force && \
    rm -rf /tmp/*

# Copy the rest of the application code
COPY . .

# Set the environment variable for the app
ENV NODE_ENV=production

# Expose the port used by the app
EXPOSE 5000

# Prune the node_modules directory to remove development dependencies and clears the npm cache and removes any temporary files
RUN npm prune --production && \
    npm cache clean --force && \
    rm -rf /tmp/*

# Start the application
CMD ["npm", "start"]

```

## 3. Docker Compose Networking
The Docker Compose file (docker-compose.yml) defines the networking configuration for the project. It includes the allocation of application ports. The relevant sections are as follows:


```
services:
  backend:
    # ...
    ports:
      - "5000:5000"
    networks:
      - yolo-network

  client:
    # ...
    ports:
      - "3000:3000"
    networks:
      - yolo-network
  
  mongodb:
    # ...
    ports:
      - "27017:27017"
    networks:
      - yolo-network

networks:
  yolo-network:
    driver: bridge
```
In this configuration, the backend container is mapped to port 5000 of the host, the client container is mapped to port 3000 of the host, and mongodb container is mapped to port 27017 of the host. All containers are connected to the yolo-network bridge network.


## 4.  Docker Compose Volume Definition and Usage
The Docker Compose file includes volume definitions for MongoDB data storage. The relevant section is as follows:

yaml

```
volumes:
  mongodata:  # Define Docker volume for MongoDB data
    driver: local

```
This volume, mongodb_data, is designated for storing MongoDB data. It ensures that the data remains intact and is not lost even if the container is stopped or deleted.

## 5. Git Workflow to achieve the task

To achieve the task the following git workflow was used:

1. Fork the repository from the original repository.
2. Clone the repo: `git@github.com:Kzizah/yolo.git`
3. Create a .gitignore file to exclude unnecessary     files and directories from version control.
4. Added Dockerfile for the client to the repo:
`git add client/Dockerfile`
5. Add Dockerfile for the backend to the repo:
`git add backend/dockerfile`
6. Committed the changes:
`git commit -m "Added Dockerfiles"`
7. Added docker-compose file to the repo:
`git add docker-compose.yml`
8. Committed the changes:
`git commit -m "Added docker-compose file"`
9. Pushed the files to github:
`git push `
10. Built the client and backend images:
`docker compose build`
11. Pushed the built imags to docker registry:
`docker compose push`
12. Deployed the containers using docker compose:
`docker compose up`

13. Created explanation.md file and modified it as the commit messages in the repo will explain.

## 6. Successful running of the applications and if not, debugging measures applied.


1. **Client Side**
The client side successfully executed on port 3000.

!["Client side"](images/successful_compilation.png)

It also successfully executed on the browser.

!["Client side"](images/frontendwebsite.png)


2. **Backend Side**
The backend side successfuly executed on port 5000.

!["Backend Dockerfile"](images/backendsuccessfullconnection.png)

It also successfully stored data after clicking the add product.

!["Backend Dockerfile"](images/backendimage.png)

3. **Debbugging Measures used**

- `docker build -t <imagename:version>` to build an image.
  - `docker images / docker image ls` to check images built.
  - `docker ps` to check running containers.
   - `docker ps -a` to check all container status.
  - `docker login` to log in to DockerHub.
  - `docker push <username:image>` to deploy image to DockerHub.
  - `docker compose down` followed by `docker compose up` for restarts.
  - `docker compose logs push` to deploy it to Dockerhub.
  - `docker compose logs <service>` for logs.
  -`docker network ls / docker network inspect` to check and inspect available networks.

## 7.  Docker image tag naming standards for ease of identification of images and containers. 
used `docker image ls` to check images have tags as follows.
- Images are tagged using this versioning (`v1.0.0`):
  - `kzizah/yolo-client:v1.0.0`
  - `kzizah/yolo-backend:v1.0.0`

!["Docker tags"](images/dockerimagetags.png)


## 8. Screenshot of your deployed image on DockerHub

Here are the links to the dockerhub images I pushed for this project:
- [Client](https://hub.docker.com/repository/docker/kzizah/yolo-client/general)
- [Backend](https://hub.docker.com/repository/docker/kzizah/yolo-backend/general)

**Screenshots**
Dockerhub Frontend
 !["Dockerhub Frontend"](images/dockerclient.png)

Dockerhub Backend
 !["Dockerhub Backend"](images/dockerbackend.png)