Here is the updated **zones-api** README with the **end-to-end (e2e) tests** section removed:

# Zones Management API

This repository contains the **Zones Management API**, which is part of the Zones Management App. The API is built using **NestJS** and provides endpoints for zone management.

## Table of Contents

- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Getting Started

Follow the steps below to set up the API for the Zones Management App.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v16+)
- [npm](https://www.npmjs.com/get-npm)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/zones-app.git
   ```

2. Navigate to the **zones-api** folder:

   ```bash
   cd zones-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

To run the application locally, follow these steps:

1. Start the API in development mode:

   ```bash
   npm run start:dev
   ```

2. The API will be running on [http://localhost:8080](http://localhost:8080).

## Running Tests

To run the tests for the API, you can use the following commands:

- **Run all unit tests**:

  ```bash
  npm run test
  ```

- **Run tests in watch mode** (useful during development):

  ```bash
  npm run test:watch
  ```

- **Generate test coverage report**:

  ```bash
  npm run test:cov
  ```

## Technologies Used

- **NestJS**: Framework for building scalable server-side applications.
- **CSV-parser** and **fast-csv**: Libraries for handling CSV file operations.
- **class-validator** and **class-transformer**: Used for request validation and transformation.
- **Jest**: Testing framework for unit tests.

## Environment Variables

Make sure to set up the following environment variables in your `.env` file:

```bash
STAGE=development
CSV_FILE_PATH=/absolute/path/to/your/csvfile.csv
PORT=8080
```

## API Endpoints

The backend API exposes the following endpoints:

- **GET api/zones**: Retrieve all zones.
- **DELETE api/zone/:id**: Delete a specific zone by ID.
- **POST api/zone**: Create a new zone with a body containing `{ name: string, points: [number, number][] }`.
