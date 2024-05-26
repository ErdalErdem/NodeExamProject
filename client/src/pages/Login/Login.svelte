<script>
  import { navigate } from "svelte-routing";
  import toast, { Toaster } from "svelte-french-toast";
  import { BASE_URL } from "../../stores/url";
  import sanitizeHTML from "../../util/sanitize.js";
  import { writable } from 'svelte/store';

  let showLogin = true;
  let showRegister = false;
  let name = "";
  let email = "";
  let password = "";
  let step = writable(1);
  let progress = writable(0);

  async function postLogin() {
    const sanitizedEmail = sanitizeHTML(email);
    const sanitizedPassword = sanitizeHTML(password);
    const response = await fetch($BASE_URL + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: sanitizedEmail,
        password: sanitizedPassword,
      }),
      credentials: "include",
    });

    if (response.status === 429) {
      navigate("/RateLimitExceeded");
      return;
    }

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }

    setTimeout(() => {
      navigate("/User");
    }, 2000);
  }

  async function handlePostLogin() {
    await toast.promise(
      postLogin(),
      {
        loading: "Signing in",
        success: "Successful sign-in",
        error: "Failed to login",
      },
      {
        duration: 1500,
        position: "top-center",
      }
    );
  }

  async function postRegister() {
    const sanitizedEmail = sanitizeHTML(email);
    const sanitizedPassword = sanitizeHTML(password);
    const sanitizedName = sanitizeHTML(name);
    const response = await fetch($BASE_URL + "/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: sanitizedName,
        email: sanitizedEmail,
        password: sanitizedPassword,
      }),
    });

    if (response.status === 429) {
      navigate("/RateLimitExceeded");
      return;
    }

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to register");
    }

    handlePostLogin();
  }

  async function handlePostRegister() {
    await toast.promise(
      postRegister(),
      {
        loading: "Registering.",
        success: "You have been registered.",
        error: "Failed to register.",
      },
      {
        duration: 1500,
        position: "top-center",
      }
    );
  }

  function toggleRegister() {
    showRegister = !showRegister;
    showLogin = !showLogin;
    step.set(1);
    progress.set(0);
  }

  function nextStep() {
    step.update(n => n + 1);
    progress.update(n => (n === 50 ? 100 : 50));
  }
</script>

<Toaster />

<main>
  <div class="auth-container">
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: {$progress}%;"></div>
    </div>
    {#if showLogin}
      {#if $step === 1}
        <form on:submit|preventDefault={nextStep} class="auth-form">
          <h2>Login</h2>
          <div class="form-control">
            <label for="email">Email:</label>
            <input type="email" bind:value={email} id="email" required />
          </div>
          <button type="submit" class="submit-button">Next</button>
          <div class="button-group">
            <button type="button" on:click={toggleRegister}>Create Account</button>
          </div>
        </form>
      {/if}
      {#if $step === 2}
        <form on:submit|preventDefault={handlePostLogin} class="auth-form">
          <h2>Login</h2>
          <div class="form-control">
            <label for="password">Password:</label>
            <input type="password" bind:value={password} id="password" required />
          </div>
          <button type="submit" class="submit-button">Login</button>
        </form>
      {/if}
    {/if}
    {#if showRegister}
      {#if $step === 1}
        <form on:submit|preventDefault={nextStep} class="auth-form">
          <h2>Sign Up</h2>
          <div class="form-control">
            <label for="name">Name:</label>
            <input type="text" bind:value={name} id="name" required />
          </div>
          <div class="form-control">
            <label for="email">Email:</label>
            <input type="email" bind:value={email} id="email" required />
          </div>
          <button type="submit" class="submit-button">Next</button>
        </form>
      {/if}
      {#if $step === 2}
        <form on:submit|preventDefault={handlePostRegister} class="auth-form">
          <h2>Sign Up</h2>
          <div class="form-control">
            <label for="password">Password:</label>
            <input type="password" bind:value={password} id="password" required />
          </div>
          <button type="submit" class="submit-button">Signup</button>
          <div class="button-group">
            <button type="button" on:click={toggleRegister}>Back to Login</button>
          </div>
        </form>
      {/if}
    {/if}
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

  .auth-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.5s ease-out;
    width: 90%;
    max-width: 400px;
    margin-bottom: 23rem;
  }

  h2 {
    color: white;
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  .form-control {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .form-control label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: #ccc;
  }

  .form-control input {
    width: 100%;
    padding: 10px;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    background: #292929;
    color: white;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    border-radius: 4px;
  }

  .form-control input:focus {
    outline: none;
    border-bottom-color: #a044ff;
  }

  .submit-button, .button-group button {
    width: 100%;
    padding: 10px 20px;
    border: none;
    background-color: #a044ff;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    margin-top: 10px;
  }

  .submit-button:hover, .button-group button:hover {
    background-color: #8e1dff;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }

  .button-group button {
    background-color: #0274ff;
    flex-grow: 1;
    margin-left: 5px;
  }

  .button-group button:hover {
    background-color: #4238ff;
  }

  .progress-bar-container {
    width: 100%;
    height: 8px; /* Increased height */
    background: rgba(255, 255, 255, 0.2); /* Semi-transparent background */
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #a044ff, #6a00ff); /* Gradient color */
    box-shadow: 0 0 10px rgba(160, 68, 255, 0.5); /* Glow effect */
    transition: width 0.5s ease; /* Smoother transition */
  }
</style>
