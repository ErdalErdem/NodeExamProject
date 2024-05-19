<script>
  import { onMount } from 'svelte';
  import { navigate } from "svelte-routing";
  import toast, { Toaster } from "svelte-french-toast";
  import { user } from "../../stores/user.js";

  let userid = $user.user.id;
  let username = $user.user.name;
  let lastLogin = '';
  let quote = '';

  onMount(async () => {
    await fetchLastLogin();
    await fetchQuote();
  });

  async function fetchLastLogin() {
    // Fetch last login data (dummy data for demonstration)
    lastLogin = 'May 20, 2024, 10:30 AM';
  }

  async function fetchQuote() {
    // Fetch a random happy quote (dummy data for demonstration)
    const quotes = [
      "Happiness is not by chance, but by choice.",
      "Be happy for this moment. This moment is your life.",
      "The purpose of our lives is to be happy.",
      "Happiness is when what you think, what you say, and what you do are in harmony."
    ];
    quote = quotes[Math.floor(Math.random() * quotes.length)];
  }

  async function postLogout() {
    const response = await fetch("http://localhost:8080/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 429) {
      navigate("/RateLimitExceeded");
      return;
    }
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to logout, try again");
    }
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  async function handlePostLogoutWithToasts() {
    await toast.promise(
      postLogout(),
      {
        loading: "Logging out",
        success: "Logged out",
        error: "Failed to logout - please try again",
      },
      {
        duration: 1500,
        position: "top-center",
      }
    );
  }
</script>

<main>
  <Toaster />

  <div class="user-container">
    <h1>Welcome, {username || "Not Available"}</h1>
    <div class="info-box">
      <p><strong>Last Logged In:</strong> {lastLogin}</p>
      <p><strong>Quote of the Day:</strong> "{quote}"</p>
    </div>
       <div class="logout-button">
      <button on:click={handlePostLogoutWithToasts} class="logout">Logout</button>
    </div>
  </div>
</main>

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

  main {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    padding-top: 5%;
  }

  .user-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.5s ease-out;
    width: 90%;
    max-width: 400px;
    margin-top: -20rem;
  }

  h1 {
    color: white;
    margin-bottom: 1rem;
    font-size: 2rem;
    animation: float 3s ease-in-out infinite;
  }

  .info-box {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    color: white;
  }

  .info-box p {
    margin: 0.5rem 0;
  }

  .logout-button {
    display: flex;
    justify-content: center;
  }

  .logout {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #ff1111;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .logout:hover {
    background-color: #b10000;
  }
</style>
