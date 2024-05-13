<main>

    <div>
        <h1>Welcome {username || "Not Available"}</h1>
        <button on:click={handlePostLogoutWithToasts} class="logout">Logout</button>
      </div>

      <div class="card">
    <p>Thank you for visiting our application. Feel free to explore our features and learn more about what we offer.</p>
  </div>

</main>



<script>

  import { navigate } from "svelte-routing";
  import toast, { Toaster } from "svelte-french-toast";
  import { user } from "../../stores/user.js";
  
  let userid = $user.user.id;
  let username = $user.user.name;

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
        success: "Logged out ",
        error: "Failed to logout - please try again",
      },
      {
        duration: 1500,
        position: "top-center",
      },
    );
  }
</script>

<style>
  

h1 {
  text-align: center;
}

/* Assuming the parent container has at least position: relative */
.card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Correctly centers the element */
    width: 190px;
    height: 254px;
    border-radius: 30px;
    background: #212121;
    box-shadow: 15px 15px 30px rgb(25, 25, 25),
                -15px -15px 30px rgb(60, 60, 60);
}




</style>

<!-- Future stylling comming in newer releases -->