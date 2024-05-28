
# NodeExamProject

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [License](#license)

## Introduction

NodeExamProject is a full-stack application built using Node.js for the server-side and Svelte for the client-side. This project demonstrates a variety of functionalities including user authentication, session management, and data sanitization.

## Project Structure

```
NodeExamProject/
├── .env.sample
├── .gitignore
├── LICENSE
├── README.md
├── request.rest
├── client/
│   ├── .gitignore
│   ├── README.md
│   ├── index.html
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── svelte.config.js
│   ├── vite.config.js
│   ├── public/
│   │   ├── facebook-icon.png
│   │   ├── github-icon.png
│   │   ├── icon.png
│   │   ├── linkedin-icon.png
│   │   ├── twitter-icon.png
│   ├── src/
│   │   ├── App.svelte
│   │   ├── app.css
│   │   ├── main.js
│   │   ├── vite-env.d.ts
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── util/
├── server/
    ├── app.js
    ├── database.db
    ├── package-lock.json
    ├── package.json
    ├── database/
    ├── routers/
    └── util/
```

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- A modern web browser

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/NodeExamProject.git
   cd NodeExamProject
   ```

2. **Install server dependencies:**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**

   ```bash
   cd ../client
   npm install
   ```

## Running the Application

1. **Set up environment variables:**

   Copy `.env.sample` to `.env` in the root directory and fill in the required environment variables.

2. **Run the server:**

   ```bash
   cd server
   nodemon app.js
   ```

3. **Run the client:**

   In a new terminal window:

   ```bash
   cd client
   npm run dev - if needed sudo npm run dev
   ```

4. **Access the application:**

   Open your web browser and navigate to `http://localhost:8080` for the client application.

## Environment Variables

The application requires several environment variables to run. Refer to the `.env.sample` file for the necessary variables. At a minimum, you will need to set up:

- `DATABASE_URL` - URL for the database connection
- `SESSION_SECRET` - Secret key for session management

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
