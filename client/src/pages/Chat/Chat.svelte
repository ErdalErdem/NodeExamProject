<script>
  export let socket;

  let message = '';
  let messages = [];

  if (socket) {
    socket.on('chatMessage', (msg) => {
      messages = [...messages, msg];
    });
  }

  function sendMessage() {
    if (message.trim() !== '') {
      socket.emit('chatMessage', message);
      message = '';
    }
  }

  function skipUser() {
    socket.emit('skip');
  }
</script>

<main>
  <h1>Real-Time Chat</h1>
  <div class="chat-container">
    <div class="messages">
      {#each messages as msg}
        <div class="message">{msg}</div>
      {/each}
    </div>
    <div class="input-container">
      <input bind:value={message} placeholder="Type a message" on:keydown={(e) => e.key === 'Enter' && sendMessage()} />
      <button on:click={sendMessage}>Send</button>
      <button class="skip" on:click={skipUser}>Skip</button>
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
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 1rem;
    max-height: 400px;
  }

  .message {
    background: #444;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    word-break: break-word;
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

  button.skip {
    background: #ff4d4d;
  }

  button:hover {
    opacity: 0.9;
  }
</style>