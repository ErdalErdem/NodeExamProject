
# NodeExamProject

## Overview

NodeExamProject is a comprehensive project combining both frontend and backend components to deliver a full-stack web application. The project includes user authentication, session management, and various utility features. It utilizes Node.js for the backend and Svelte for the frontend.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Setup and Installation](#setup-and-installation)
4. [Environment Variables](#environment-variables)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
7. [License](#license)

## Project Structure

The project is organized into the following directories:

- `client`: Contains the frontend application built with Svelte.
- `server`: Contains the backend application built with Node.js and Express.
- `server/database`: Contains database connection and setup scripts.
- `server/routers`: Contains route handlers for various API endpoints.
- `server/util`: Contains utility functions for the backend.

### Frontend (Client)

- **Main files**:
  - `index.html`: The main HTML file.
  - `main.js`: The main JavaScript entry point.
  - `App.svelte`: The main Svelte component.
  - `vite.config.js`: Vite configuration file.

- **Directories**:
  - `public`: Contains public assets like images.
  - `src`: Contains source code, including components, stores, and utilities.

### Backend (Server)

- **Main files**:
  - `app.js`: The main entry point for the backend server.
  - `package.json`: Contains dependencies and scripts for the backend.
  - `predict.py`: Python script for model prediction.
  - `train_model.py`: Python script for training the model.

- **Directories**:
  - `database`: Contains database setup and connection scripts.
  - `routers`: Contains route handlers.
  - `util`: Contains utility functions for password handling and sanitization.

## Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- NPM (v6 or later)
- Python (if using machine learning scripts)
- MySQL (for database setup)

## Setup and Installation

1. **Clone the repository**:
   \`\`\`sh
   git clone https://github.com/yourusername/NodeExamProject.git
   cd NodeExamProject
   \`\`\`

2. **Install dependencies**:

   - For the backend:
     \`\`\`sh
     cd server
     npm install
     \`\`\`

   - For the frontend:
     \`\`\`sh
     cd client
     npm install
     \`\`\`

3. **Setup the database**:
   - Ensure MySQL is running and create a database.
   - Update the database connection settings in `server/database/connectMySql.js`.

4. **Environment Variables**:
   - Copy the sample environment file and update it with your settings:
     \`\`\`sh
     cp .env.sample .env
     \`\`\`

## Running the Application

1. **Backend**:
   \`\`\`sh
   cd server
   npm start
   \`\`\`

2. **Frontend**:
   \`\`\`sh
   cd client
   npm run dev
   \`\`\`

## API Endpoints

Here are some of the main API endpoints available in the backend:

- **User Authentication**:
  - \`POST /auth/login\`: Login a user.
  - \`POST /auth/register\`: Register a new user.

- **Session Management**:
  - \`GET /session\`: Get current session.
  - \`DELETE /session\`: Logout a user.

- **Prediction**:
  - \`POST /predict\`: Make a prediction using the trained model.

For more details, refer to the route handlers in the \`server/routers\` directory.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
