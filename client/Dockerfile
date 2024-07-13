# Use Node.js LTS version with Yarn
FROM node:14

# Set working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY . .

# Build the React app
RUN npm run build

# Expose port
EXPOSE 3000

# Command to run the frontend server
CMD ["npm", "start"]
