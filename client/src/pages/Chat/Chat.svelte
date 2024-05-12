<script>
    // You can put your JavaScript here, such as any setup or state-related logic
    let users = ['Brad', 'John', 'Mary', 'Paul', 'Mike'];
    let messages = [
      { name: 'Brad', time: '9:12pm', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, repudiandae.' },
      { name: 'Mary', time: '9:15pm', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, repudiandae.' }
    ];
  
    function sendMessage() {
      // Function to send message
    }
  </script>
  
  <div class="chat-container">
    <header class="chat-header">
      <h1><i class="fas fa-smile"></i> ChatCord</h1>
      <a href="Home.svelte" class="btn">Leave Room</a>
    </header>
    <main class="chat-main">
      <div class="chat-sidebar">
        <h3><i class="fas fa-comments"></i> Room Name:</h3>
        <h2 id="room-name">JavaScript</h2>
        <h3><i class="fas fa-users"></i> Users</h3>
        <ul id="users">
          {#each users as user}
            <li>{user}</li>
          {/each}
        </ul>
      </div>
      <div class="chat-messages">
        {#each messages as message}
          <div class="message">
            <p class="meta">{message.name} <span>{message.time}</span></p>
            <p class="text">{message.text}</p>
          </div>
        {/each}
      </div>
    </main>
    <div class="chat-form-container">
      <form id="chat-form" on:submit|preventDefault={sendMessage}>
        <input
          id="msg"
          type="text"
          placeholder="Enter Message"
          required
          autocomplete="off"
        />
        <button class="btn" type="submit"><i class="fas fa-paper-plane"></i> Send</button>
      </form>
    </div>
  </div>
  
  <style>
    /* Your CSS here. Make sure you include styles or link to your stylesheet */
      /* Style properties */
    
    /* More styles as needed */
  </style>
  