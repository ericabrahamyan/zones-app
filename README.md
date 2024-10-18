# Zones Management Application

This repository contains the **Zones Management App**, which is a full-stack project consisting of two main parts:

- **zones-api**: The backend API built using NestJS.
- **zones-ui**: The frontend user interface built using React and Vite.

## Table of Contents

- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
  - [Running with Docker](#running-with-docker)
  - [Running without Docker](#running-without-docker)
- Project

## Getting Started

This project can be run either with Docker or locally without Docker. Below are the steps for both methods.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/)&#x20;
- [npm](https://www.npmjs.com/get-npm)
- [Docker](https://www.docker.com/get-started) (if using Docker)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/zones-app.git
   ```

2. Navigate to the project root:

   ```bash
   cd zones-app
   ```

3. Install dependencies separately for the UI and API:

   - For **zones-api**:

     ```bash
     cd zones-api
     npm install
     ```

   - For **zones-ui**:

     ```bash
     cd ../zones-ui
     npm install
     ```

4. Navigate back to the project root:

   ```bash
   cd ..
   ```

## Running the Application

You can run the Zones Management App either using Docker or without Docker.

### Running with Docker

To run the application using Docker, follow these steps:

1. **Build the Docker images** for both frontend and backend:

   ```bash
   docker-compose build
   ```

2. **Start the containers** in detached mode:

   ```bash
   docker-compose up -d
   ```

   This will:

   - Start the **frontend** container on [http://localhost](http://localhost).
   - Start the **backend** container on port `3000`.

3. **Verify the containers are running**:
   You can check the running containers using:

   ```bash
   docker ps
   ```

4. **Access the application**:
   Open your browser and go to [http://localhost](http://localhost) to access the front end. The front end will communicate with the back end automatically.

To stop the containers, run:

```bash
docker-compose down
```

### Running without Docker

To run both the frontend and backend concurrently in development mode without Docker, use the following command:

```bash
npm run dev
```

This will:

- Start the **frontend** (zones-ui) development server (Vite) on [http://localhost:3000](http://localhost:3000).
- Start the **backend** (zones-api) development server (NestJS) on [http://localhost:3001](http://localhost:3001).

You can access the application by navigating to [http://localhost:3000](http://localhost:3000).

#### Running Backend and Frontend Individually

- To run only the **frontend**:

  ```bash
  npm run dev:frontend
  ```

- To run only the **backend**:

  ```bash
  npm run dev:backend
  ```

## Technologies Used

### Backend (zones-api)

- **NestJS**: Framework for building scalable server-side applications.
- **CSV-parser** and **fast-csv**: Libraries for handling CSV file operations.
- **class-validator** and **class-transformer**: For validating and transforming request data.
- **Jest**: Testing framework for unit tests.

### Frontend (zones-ui)

- **React**: JavaScript library for building user interfaces.
- **Vite** (template react-ts): Fast frontend build tool and development server.
- **Chakra UI**: Component library for styling.
- **react-query**: For data fetching and caching.
- **axios**: HTTP client for making API requests.

### Containerization

- **Docker**: For containerizing the frontend and backend applications.

## Project Structure

- **zones-api**: The backend API (NestJS).
- **zones-ui**: The frontend user interface (React + Vite).

Each sub-project has its own `README.md` file with more specific instructions:

- [zones-api README](zones-api/README.md)
- [zones-ui README](zones-ui/README.md)

## Environment Variables

### zones-ui/.env

```
VITE_BACKEND_URL=http://localhost:8080/api
```

### zones-api/.env

```
STAGE=development
CSV_FILE_PATH=/Users/ericabrahamyan/Documents/test.csv
PORT=8080
```

## Backend Endpoints

The backend (`zones-api`) exposes the following endpoints:

- **GET /zones**: Retrieve all zones.
- **DELETE /zone/**: Delete a specific zone by ID.
- **POST /zone**: Create a new zone with a body containing `{ name: string, points: [number, number][] }`.
