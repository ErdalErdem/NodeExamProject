<script>
    import { user } from "../../stores/user.js";
    import { onMount } from "svelte";
    import toast, { Toaster } from "svelte-french-toast";
    
    let userProfile;
    let welcomeMessage = '';
    let randomQuote = '';
    
    // Subscribe to the user store
    $: userProfile = $user;
  
    const quotes = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
      "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
      "The best way to predict the future is to invent it. - Alan Kay",
      "Don't watch the clock; do what it does. Keep going. - Sam Levenson"
    ];
  
    onMount(() => {
      if (userProfile && userProfile.name) {
        welcomeMessage = `Welcome, ${userProfile.name}!`;
      } else {
        welcomeMessage = `Welcome to JustChatting + Fruit?`;
      }
      randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    });
  </script>
  
  <Toaster />
  
  <main>
    <div class="welcome-container">
      <h1>{welcomeMessage}</h1>
      <p class="quote">{randomQuote}</p>
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
      color: white;
      padding: 2rem;
      box-sizing: border-box;
    }
  
    .welcome-container {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.5s ease-out;
      max-width: 600px;
      width: 100%;
      margin-bottom: 15rem;

    }
  
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      animation: float 3s ease-in-out infinite;
    }
  
    .quote {
      font-size: 1.2rem;
      margin-top: 1rem;
      color: #ccc;
      font-style: italic;
      animation: float 3s ease-in-out infinite;
    }
  </style>
  