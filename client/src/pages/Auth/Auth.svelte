<script>
  import { navigate } from 'svelte-routing';
  
  function goHome() {
    navigate('/');
  }
</script>

<div class="unauthorized-container">
  <div class="message">Oops! You don't have access to this page.</div>
  <button on:click={goHome} class="home-button">Return to homepage</button>
</div>

<style>
  .unauthorized-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    padding: 2rem;
    border-radius: 10px;
  }

  .message {
    color: #ffffff; 
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .home-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4CAF50; 
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .home-button:hover {
    background-color: #45a049;
  }
</style>
