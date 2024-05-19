<script>
  import { onMount } from 'svelte';
  import io from 'socket.io-client';
  import { user } from "../../stores/user.js"; // Import the user store
  import { get } from 'svelte/store';

  let socket;
  let messages = [];
  let message = '';
  let activeUsers = [];
  let userId;

  // Subscribe to the user store
  $: userId = get(user)?.id;

  onMount(() => {
    socket = io('http://localhost:8080');

    if (userId) {
      socket.emit('register user', userId);
    }

    socket.on('chat message', (msg) => {
      messages = [...messages, msg];
    });

    socket.on('active users', (users) => {
      activeUsers = users;
    });

    return () => {
      socket.disconnect();
    };
  });

  function sendMessage() {
    if (message.trim()) {
      socket.emit('chat message', message);
      message = '';
    }
  }
</script>

<style>
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .chat {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.5s ease-out;
    color: white;
  }

  .messages {
    list-style-type: none;
    padding: 0;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 1rem;
  }

  .message {
    margin: 10px 0;
    padding: 10px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .input-group {
    display: flex;
    margin-top: 1rem;
  }

  .input-group input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 10px 0 0 10px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 16px;
    outline: none;
  }

  .input-group button {
    padding: 10px 20px;
    border: none;
    background-color: #a044ff;
    color: white;
    border-radius: 0 10px 10px 0;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .input-group button:hover {
    background-color: #8811ff;
  }

  .active-users {
    margin: 20px 0;
    text-align: center;
  }

  .active-user {
    padding: 5px;
    background: rgba(255, 255, 255, 0.2);
    margin: 5px 0;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="chat">
  <ul class="messages">
    {#each messages as msg}
      <li class="message">{msg}</li>
    {/each}
  </ul>
  <div class="input-group">
    <input type="text" bind:value={message} placeholder="Type a message..." />
    <button on:click={sendMessage}>Send</button>
  </div>
  <div class="active-users">
    <h3>Active Users</h3>
    <ul>
      {#each activeUsers as user}
        <li class="active-user">{user}</li>
      {/each}
    </ul>
  </div>
</div>
