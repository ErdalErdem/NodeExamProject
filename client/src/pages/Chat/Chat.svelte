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
    .chat {
      max-width: 600px;
      margin: 0 auto;
    }
    .messages {
      list-style-type: none;
      padding: 0;
    }
    .message {
      margin: 10px 0;
      padding: 10px;
      border-radius: 5px;
      background-color: #000000;
    }
    .input-group {
      display: flex;
    }
    .input-group input {
      flex: 1;
      padding: 10px;
      font-size: 16px;
    }
    .input-group button {
      padding: 10px 20px;
      font-size: 16px;
    }
    .active-users {
      margin: 20px 0;
    }
    .active-user {
      padding: 5px;
      background-color: #e0e0e0;
      margin: 5px 0;
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
  