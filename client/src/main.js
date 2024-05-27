import { io } from 'socket.io-client';
import './app.css'
import App from './App.svelte';

const socket = io('http://localhost:8080');

const app = new App({
  target: document.body,
  props: {
    socket
  }
});

export default app;