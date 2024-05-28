<script>
  import { onMount, afterUpdate } from 'svelte';
  export let socket;

  let message = '';
  let messages = [];
  let currentRoom = '';
  let username = 'User' + Math.floor(Math.random() * 1000);
  let chatContainer;
  let pageVisible = false;

  if (socket) {
    socket.on('chatMessage', ({ user, msg }) => {
      messages = [...messages, { user, msg, isCurrentUser: user === username }];
    });
  }

  function joinRoom(room) {
    if (currentRoom !== '') {
      socket.emit('leaveRoom', currentRoom);
    }
    currentRoom = room;
    socket.emit('joinRoom', { room, username });
    messages = []; 
  }

  function leaveRoom() {
    if (currentRoom !== '') {
      socket.emit('leaveRoom', currentRoom);
      currentRoom = '';
      messages = [];
    }
  }

  function sendMessage() {
    if (message.trim() !== '') {
      socket.emit('chatMessage', { msg: message, room: currentRoom, user: username });
      message = '';
    }
  }

  function skipUser() {
    socket.emit('skip', currentRoom);
  }

  function scrollToBottom() {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  onMount(() => {
    pageVisible = true;
    joinRoom('defaultRoom');
  });

  afterUpdate(() => {
    scrollToBottom();
  });
</script>

<main class:fade-in={pageVisible}>
  <h1>JustChatting</h1>
  <div class="room-container">
    <button on:click={() => joinRoom('Meet new friends')}>Meet new friends</button>
    <button on:click={() => joinRoom('Talk interest')}>Talk interest</button>
    <button on:click={leaveRoom}>Leave Room</button>
  </div>
  <p class="current-room">Current Room: <span>{currentRoom || 'No Room'}</span></p>
  <div class="chat-container" bind:this={chatContainer}>
    <div class="messages">
      {#each messages as { user, msg, isCurrentUser }}
        <div class="message-container {isCurrentUser ? 'current-user' : 'other-user'}">
          <div class="message">
            <strong>{user}:</strong> {msg}
          </div>
        </div>
      {/each}
    </div>
    <div class="input-container">
      <input bind:value={message} placeholder="Type a message" on:keydown={(e) => e.key === 'Enter' && sendMessage()} />
      <button on:click={sendMessage}>Send</button>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    opacity: 0;
    transition: opacity 1s ease-in;
  }

  .fade-in {
    opacity: 1;
  }

  .room-container {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .current-room {
    font-size: 1.2rem;
    color: #fff;
    margin-bottom: 1rem;
  }

  .current-room span {
    font-weight: bold;
    color: #ffde59;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  .chat-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    background: #333;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    height: 200px; 
    overflow-y: auto; 
  }

  .messages {
    flex: 1;
    margin-bottom: 1rem;
  }

  .message-container {
    display: flex;
    margin-bottom: 0.5rem;
    word-break: break-word;
  }

  .current-user {
    justify-content: flex-start;
  }

  .other-user {
    justify-content: flex-end;
  }

  .message {
    max-width: 60%;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background: #444;
    color: #ddd;
    position: relative;
  }

  .current-user .message {
    background: #646cff;
    color: #fff;
    border-bottom-left-radius: 0;
  }

  .other-user .message {
    background: #444;
    color: #ddd;
    border-bottom-right-radius: 0;
  }

  .input-container {
    display: flex;
    gap: 0.5rem;
  }

  input {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    background: #555;
    color: #fff;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: #646cff;
    color: #fff;
    cursor: pointer;
  }


  button:hover {
    opacity: 0.9;
  }
</style>
