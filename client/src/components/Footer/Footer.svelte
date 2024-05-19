<footer>
    <div class="footer-content">
        <p>© 2024 JustChatting</p>
        <div class="social-links">
            <a href="https://github.com" target="_blank">
                <img src="/public/github-icon.png" alt="Github">
            </a>
            <a href="https://twitter.com" target="_blank">
                <img src="/public/twitter-icon.png" alt="Twitter">
            </a>
            <a href="https://facebook.com" target="_blank">
                <img src="/public/facebook-icon.png" alt="Facebook">
            </a>
            <a href="https://linkedin.com" target="_blank">
                <img src="/public/linkedin-icon.png" alt="LinkedIn">
            </a>
        </div>
    </div>
</footer>

<style>
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    color: white;
    text-align: center;
    padding: 20px;
    box-shadow: 0 -8px 15px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }

  .footer-content p {
    margin: 0;
  }

  .social-links {
    display: flex;
    gap: 20px;
  }

  .social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .social-links a img {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease, filter 0.3s ease;
  }

  .social-links a:hover img {
    transform: scale(1.2);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }

  .social-links a::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 70%);
    transition: transform 0.5s ease;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
  }

  .social-links a:hover::before {
    transform: translate(-50%, -50%) scale(1);
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      align-items: center;
    }

    .social-links {
      margin-top: 10px;
    }
  }
</style>
