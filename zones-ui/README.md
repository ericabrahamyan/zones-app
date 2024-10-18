# Zones Management UI

This repository contains the **Zones Management UI**, which is part of the Zones Management App. The UI is built using **React** and **Vite**.

## Table of Contents

- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)

## Getting Started

Follow the steps below to set up the UI for the Zones Management App.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v16+)
- [npm](https://www.npmjs.com/get-npm)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/zones-app.git
   ```

2. Navigate to the **zones-ui** folder:

   ```bash
   cd zones-ui
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

To run the application locally, follow these steps:

1. Start the UI in development mode:

   ```bash
   npm run dev
   ```

2. Open your browser and go to [http://localhost:5173](http://localhost:5173).

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Frontend build tool and development server.
- **Chakra UI**: Component library for UI styling.
- **react-query**: For data fetching and caching.
- **axios**: HTTP client for API requests.

## Environment Variables

Make sure to set up the following environment variable in your `.env` file:

```bash
VITE_BACKEND_URL=http://localhost:8080/api
```
