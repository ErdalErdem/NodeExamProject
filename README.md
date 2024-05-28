# JustChatting

Welcome to **JustChatting**, a real-time chat application where users can join different rooms, send messages, and interact seamlessly.

## Features

- **Join and Leave Rooms:** Easily switch between different chat rooms or leave a room when needed.
- **Real-Time Messaging:** Messages are sent and received in real-time, ensuring an interactive experience.
- **Dynamic Room Display:** Current room is prominently displayed with stylish animations.
- **User-Friendly UI:** Clean, modern interface with automatic scrolling to the latest messages.

## Screenshots

![Chat Room](screenshots/chat-room.png)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/justchatting.git
    cd justchatting
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:

    ```plaintext
    SESSION_SECRET=your_session_secret
    PORT=8080
    ```

### Running the Application

1. Start the server:

    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:8080`.

## Usage

- **Joining a Room:** Click on the room buttons (e.g., "Meet new friends", "Talk interest") to join a specific room.
- **Leaving a Room:** Click on the "Leave Room" button to exit the current room.
- **Sending Messages:** Type your message in the input box and hit "Enter" or click "Send" to send a message.
- **Skipping Users:** Click on the "Skip" button to skip a user (if applicable).

## Project Structure

```plaintext
.
├── public
│   ├── index.html
│   ├── main.css
│   └── main.js
├── src
│   ├── components
│   │   └── Chat.svelte
│   ├── routes
│   │   └── index.js
│   ├── server.js
│   └── utils
│       └── helpers.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── screenshots
    └── chat-room.png
