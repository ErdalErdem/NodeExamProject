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

<header>
  <nav class="navbar">
    <div class="logo">
      <button on:click={() => navigateTo('User')}>
        <img src="/public/icon.png" alt="Logo">
      </button>
      <div class="site-name">JustChatting + Fruit?</div>
    </div>
    <ul class="nav-links">
      <li><button on:click={() => navigateTo('Home')}>Home</button></li>
      <li><button on:click={() => navigateTo('Chat')}>Chat</button></li>
      <li><button on:click={() => navigateTo('Predict')}>Predict</button></li>
      <li><button on:click={() => navigateTo('User')}>User</button></li>
    </ul>
  </nav>
</header>

<style>
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  header {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 1rem 2rem;
    color: white;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 10;
    transition: background 0.3s ease-in-out;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .logo button {
    font-size: 0;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .logo img {
    height: 50px;
    transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
    animation: float 3s ease-in-out infinite;
  }

  .logo button:hover img {
    transform: scale(1.1);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }

  .site-name {
    font-size: 1.8rem;
    color: white;
    margin-left: 0.5rem;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 20px;
  }

  .nav-links li {
    position: relative;
  }

  .nav-links li button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 10px 20px;
    border: 2px solid transparent;
    border-radius: 30px;
    font-size: 16px;
    transition: all 0.3s ease;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  .nav-links li button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 30px;
    z-index: -1;
    transition: transform 0.3s ease;
    transform: scaleX(0);
    transform-origin: left;
  }

  .nav-links li button:hover::before {
    transform: scaleX(1);
  }

  .nav-links li button:hover {
    color: #6a3093;
  }

  .nav-links li button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 70%);
    transition: transform 0.5s ease;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
  }

  .nav-links li button:hover::after {
    transform: translate(-50%, -50%) scale(1);
  }

  .nav-links li button:hover::after {
    animation: ripple 0.6s linear infinite;
  }

  @keyframes ripple {
    from {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .nav-links {
      flex-direction: column;
      align-items: flex-start;
    }

    .nav-links li {
      margin-bottom: 10px;
    }
  }
</style>
