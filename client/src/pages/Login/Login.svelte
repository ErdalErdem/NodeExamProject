<main>
    <div class="auth-container">
        
        {#if showLogin}
        <script>
            let email = '';
            let password = '';
            // Function to handle login
            function handlePostLogin() {
                console.log('Login Functionality Here');
            }
            // Function to toggle to the register view
            function toggleRegister() {
                console.log('Toggle to Register View');
            }
        </script>
        
        <form on:submit|preventDefault={handlePostLogin} class="auth-form">

<h2>Login</h2>
            <div class="form-control">
                <label for="email">Email:</label>
                <input type="email" bind:value={email} id="email" required />
            </div>
            <div class="form-control">
                <label for="password">Password:</label>
                <input
                    type="password"
                    bind:value={password}
                    id="password"
                    required
                />
            </div>
            <button type="submit" class="submit-button">Login</button>
            <div class="button-group">
                <button type="button" on:click={toggleRegister}>Create Account</button>
            </div>
        </form>
        
        {/if}
        {#if showRegister}
        <form on:submit|preventDefault={handlePostRegister} class="auth-form">
            <div class="form-control">
                <label for="name">Name:</label>
                <input type="text" bind:value={name} id="name" required />
            </div>
        
            <div class="form-control">
                <label for="email">Email:</label>
                <input type="email" bind:value={email} id="email" required />
            </div>
        
            <div class="form-control">
                <label for="password">Password:</label>
                <input type="password" bind:value={password} id="password" required />
            </div>
        
            <button type="submit" class="submit-button">Signup</button>
        </form>
        {/if}
        
    </div>
    
</main>

<!-- Future stylling comming in newer releases -->

<style>
   
h2 {
text-align: center;

}
  .auth-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    background-color: #171717; /* Dark theme to match the header */
    color: white; /* Text color */
    
}

.form-control {
    margin-bottom: 15px;
}

.form-control label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: #ccc; /* Lighter color for labels to stand out less */
}

.form-control input {
    width: 100%;
    padding: 10px;
    border: 2px solid #333; /* Subtle border */
    border-radius: 4px;
    background: #292929; /* Slightly lighter background for inputs */
    color: white; /* Text color for input */
    box-sizing: border-box;
}

.submit-button, .button-group button {
    width: 100%;
    padding: 10px 20px;
    border: none;
    background-color: #ffa811; /* Purple background */
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    margin-top: 10px;
}

.submit-button:hover, .button-group button:hover {
    background-color: #e69200; /* Lighter purple on hover */
}

.button-group {
    display: flex;
    justify-content: space-between;
}

.button-group button {
    background-color: #0270ff; /* Distinct color for button group */
    flex-grow: 1;
    margin-left: 5px;
}

.button-group button:hover {
    background-color: #4238ff; /* Hover effect for button group */
}


</style>

<script>
    import { navigate } from "svelte-routing";
    import toast, { Toaster } from "svelte-french-toast";
    import { BASE_URL } from "../../stores/url";
    import sanitizeHTML from "../../util/sanitize.js";

    let showLogin = true;
    let showRegister = false;
    let name = "";
    let email = "";
    let password = "";

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
            },
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
                password: sanitizedPassword
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
                success:
                    "You have been registered.",
                error: "Failed to register.",
            },
            {
                duration: 1500,
                position: "top-center",
            },
        );
    }

    function toggleRegister() {
        showRegister = true;
        showLogin = false;
    }
</script>

<Toaster />
