import { writable } from 'svelte/store';

export const user = writable({
  id: null,
  username: null,
  isAuthenticated: false
});

export function setUser(userData) {
  user.set({
    id: userData.id,
    username: userData.username,
    isAuthenticated: true
  });
}

export function clearUser() {
  user.set({
    id: null,
    username: null,
    isAuthenticated: false
  });
}
