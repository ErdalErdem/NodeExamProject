import { writable } from 'svelte/store';

// Create a writable store for user data
export const user = writable({
  id: null,
  username: null,
  isAuthenticated: false
});

// Function to set user data
export function setUser(userData) {
  user.set({
    id: userData.id,
    username: userData.username,
    isAuthenticated: true
  });
}

// Function to clear user data (e.g., on logout)
export function clearUser() {
  user.set({
    id: null,
    username: null,
    isAuthenticated: false
  });
}
