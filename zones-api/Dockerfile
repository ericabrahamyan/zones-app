# Dockerfile for zones-api (backend)
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the project
RUN npm run build

# Expose the port that NestJS listens on
EXPOSE 8080

# Start the NestJS app
CMD ["npm", "run", "start:prod"]