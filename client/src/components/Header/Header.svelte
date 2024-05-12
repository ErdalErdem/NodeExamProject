
<header>
  <nav class="navbar">
    <div class="logo">
      <button on:click={() => navigateTo('')}>
        <img src="/public/icon.png" alt="Logo" style="height: 50px; vertical-align: middle;">
        <!-- Optional: include text if you want a text logo -->
      </button>
          </div>
    <ul class="nav-links">
      <li><button on:click={() => navigateTo('')}>Home</button></li>
      <li><button on:click={() => navigateTo('User')}>User</button></li>
      <li><button on:click={() => navigateTo('Next Release')}>Next Release</button></li>
      <li><button on:click={() => navigateTo('Contact')}>Contact</button></li>
      <li><button on:click={() => navigateTo('Chat')}>Chat</button></li>
    </ul>
  </nav>
</header>
  
  <style>
  header {
    background: url('/header-bg.jpg') no-repeat center center / cover;
    padding: 1rem 2rem;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .logo button {
    font-size: 20px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 10px;
  }

  .nav-links li button {
    background: transparent;
    color: white;
    padding: 10px 20px;
    border: 2px solid transparent;
    border-radius: 5px;
    font-size: 16px;
    transition: all 0.3s ease;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .nav-links li button:hover {
    background: white;
    color: #6a3093;
    border-color: white;
  }

</style>

<script>
  import { navigate } from "svelte-routing";

  async function navigateTo(route) {
    try {
      const response = await fetch(`/${route}`);

      if (response.ok) {
        navigate(`/${route}`);
      } else if (response.status === 429) {
        navigate('/RateLimitExceeded');
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }
</script>