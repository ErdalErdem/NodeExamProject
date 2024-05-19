<script>
    import { onMount } from 'svelte';
    import toast, { Toaster } from "svelte-french-toast";
    import { navigate } from "svelte-routing";
    import { BASE_URL } from "../../stores/url.js";
    import sanitizeHTML from "../../util/sanitize.js";
    import sanitizeEmail from "../../util/sanitize.js";
  
    let email = "erda0028@stud.kea.dk";
    let subject;
    let message;
  
    async function postEmail() {
      const sanitizedEmail = sanitizeEmail(email);
      const sanitizedSubject = sanitizeHTML(subject);
      const sanitizedMessage = sanitizeHTML(message);
      const response = await fetch(`${BASE_URL}/api/mails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: sanitizedEmail,
          subject: sanitizedSubject,
          message: sanitizedMessage,
        }),
      });
      if (response.ok) {
        try {
          const data = await response.json();
          console.log("Email sent successfully: ", data);
          setTimeout(() => {
            location.reload();
          }, 2000);
        } catch (e) {
          console.error("Error sending email: ", e);
        }
      } else if (response.status === 429) {
        navigate("/RateLimitExceeded");
      } else {
        console.error("Failed to send email: ", await response.text());
      }
    }
  
    async function handlePostEmail() {
      await toast.promise(
        postEmail(),
        {
          loading: "Sending email...",
          success: "Email sent successfully",
          error: "Failed to send email - please try again",
        },
        {
          duration: 1500,
          position: "top-center",
        },
      );
    }
  </script>
  
  <Toaster />
  
  <main>
    <div class="container">
      <form on:submit|preventDefault={handlePostEmail} class="form">
        <h2>Send Email</h2>
  
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          placeholder="Enter recipient's email"
          required
          readonly
        />
  
        <label for="subject">Subject:</label>
        <input
          id="subject"
          type="text"
          bind:value={subject}
          placeholder="Subject"
          required
        />
  
        <label for="message">Message:</label>
        <textarea
          id="message"
          bind:value={message}
          placeholder="Message"
          required
        ></textarea>
  
        <button type="submit" class="submit-button">Send Email</button>
      </form>
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
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      overflow: hidden;
      position: relative;
    }
  
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.5s ease-out;
      max-width: 500px;
      width: 100%;
      margin-bottom: 12rem;

    }
  
    h2 {
      color: white;
      margin-bottom: 1rem;
    }
  
    .form {
      width: 100%;
      display: flex;
      flex-direction: column;
      color: white;
    }
  
    .form label {
      margin-bottom: 8px;
      font-size: 16px;
      color: #ccc;
    }
  
    .form input,
    .form textarea {
      padding: 12px;
      margin-bottom: 15px;
      border: none;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 16px;
      box-sizing: border-box;
    }
  
    .form input:focus,
    .form textarea:focus {
      outline: none;
      border: 2px solid #a044ff;
    }
  
    #email {
      cursor: not-allowed;
      background-color: rgba(255, 255, 255, 0.3);
    }
  
    .form textarea {
      height: 100px;
      resize: none;
    }
  
    .submit-button {
      background-color: #a044ff;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      font-weight: bold;
    }
  
    .submit-button:hover {
      background-color: #8f1eff;
    }
  </style>
  