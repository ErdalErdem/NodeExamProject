<script>
    import { onMount } from 'svelte';
  
    let predictionResult = 'Click the button to predict the type of food in front of the camera.';
  
    const predictFood = async () => {
      try {
        const response = await fetch('http://localhost:8080/predict');
        const data = await response.text();
        predictionResult = 'Prediction: ' + data;
      } catch (error) {
        console.error('Error:', error);
        predictionResult = 'Error making prediction.';
      }
    };
  
    onMount(() => {
      document.body.classList.add('fade-in');
    });
  </script>
  
  <style>
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
   
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      color: var(--text-color-light, #ffffff);
      font-family: var(--font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);
    }
  
    h1 {
      margin-bottom: 20px;
      font-size: var(--font-size-large, 2rem);
      color: var(--primary-color, #007aff);
    }
  
    button {
      background-color: var(--primary-color, #007aff);
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: var(--font-size-medium, 16px);
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s;
    }
  
    button:hover {
      background-color: #005bb5; /* Adjusted for the primary color */
    }
  
    p {
      margin-top: 20px;
      font-size: var(--font-size-medium, 16px);
    }
  </style>
  
  <main>
    <h1>Food Prediction</h1>
    <button on:click={predictFood}>Predict Food Type</button>
    <p>{predictionResult}</p>
  </main>
  