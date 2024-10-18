# Dockerfile for zones-ui

# Build stage
FROM node:18 AS builder
WORKDIR /app

# Copy necessary files
COPY package.json package-lock.json ./


# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Serve the build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
