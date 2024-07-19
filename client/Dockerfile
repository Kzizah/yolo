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
