Here's an updated `README.md` for your project with additional instructions for running the application using Docker:

### Root `README.md`

````markdown
# Zones Management Application

This repository contains the **Zones Management App**, which is a full-stack project consisting of two main parts:

- **zones-api**: The backend API built using NestJS.
- **zones-ui**: The frontend user interface built using React and Vite.

## Table of Contents

- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
  - [Running with Docker](#running-with-docker)
  - [Running without Docker](#running-without-docker)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

This project can be run either with Docker or locally without Docker. Below are the steps for both methods.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm)
- [Docker](https://www.docker.com/get-started) (if using Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/zones-app.git
   ```
````

2. Navigate to the project root:

   ```bash
   cd zones-app
   ```

3. Install dependencies for the root, backend (`zones-api`), and frontend (`zones-ui`):
   ```bash
   npm install
   cd zones-api && npm install
   cd ../zones-ui && npm install
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
   Open your browser and go to [http://localhost](http://localhost) to access the frontend. The frontend will communicate with the backend automatically.

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

## Project Structure

This repository contains two sub-projects:

- **zones-api**: The backend API (NestJS).
- **zones-ui**: The frontend user interface (React + Vite).

Each sub-project has its own `README.md` file with more specific instructions:

- [zones-api README](zones-api/README.md)
- [zones-ui README](zones-ui/README.md)

## Contributing

We welcome contributions! Please refer to the individual `README.md` files in the **zones-api** and **zones-ui** directories for contribution guidelines.

## License

This project is licensed under the ISC License.

```

### Key Additions

- **Running with Docker**: Instructions to build and run the application using Docker.
- **Docker Compose Commands**: Added `docker-compose build` and `docker-compose up -d` commands for building and starting the containers.
- **Accessing the App**: Explained how to access the application running in Docker on `localhost`.

This updated `README.md` provides users with clear instructions to run the app either using Docker or locally without Docker, making it flexible for various environments.
```
