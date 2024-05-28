
# NodeExamProject

<img src="client/public/Justchattingbanner.png" alt="Description of image" width="600" height="200">


## Overview
NodeExamProject is a web application that consists of a client and server. The client is built with Svelte and Vite, and the server is built with Node.js and Express. This project includes functionalities for user authentication, session management, XSS prevention, and a machine learning model for fruit prediction.

## Features
- User Authentication
- Session Management
- XSS Prevention
- Fruit Prediction using a Machine Learning Model

## Project Structure
```markdown
NodeExamProject-master/
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
│   │   ├── Justchattingbanner.png
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
│   │   ├── routes/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── util/
├── server/
│   ├── app.js
│   ├── database.db
│   ├── fruit_model.h5
│   ├── package-lock.json
│   ├── package.json
│   ├── predict.py
│   ├── train_model.py
│   ├── database/
│   ├── routers/
│   ├── util/
```

## Installation

### Prerequisites
- Node.js
- npm

### Steps
1. Clone the repository
    ```sh
    git clone https://github.com/ErdalErdem/NodeExamProject.git
    cd NodeExamProject-master
    ```

2. Install server dependencies
    ```sh
    cd server
    npm install
    ```

3. Install client dependencies
    ```sh
    cd ../client
    npm install
    ```

4. Setup environment variables
    - Copy `.env.sample` to `.env` in the server directory and fill in the required values.

## Usage

### Running the Server
Navigate to the `server` directory and start the server:
```sh
cd server
nodemon app.js
```

### Running the Client
Navigate to the `client` directory and start the client:
```sh
cd client
npm run dev or sudo npm run dev
```

## API Endpoints

### User Authentication
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login a user.

### Session Management
- **GET /api/session**: Check user session.

### Fruit Prediction
- **POST /api/predict**: Predict the type of fruit.

### XSS Prevention
- **POST /api/xss**: Check for XSS vulnerabilities.

## Machine Learning Model
The machine learning model for fruit prediction is located in `server/fruit_model.h5` and is utilized by the `predict.py` script.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
