import { create } from 'zustand';
import authService from '../services/authService';

const TOKEN_KEY = 'auth_token';

const useStore = create((set) => ({
  token: localStorage.getItem(TOKEN_KEY) || null,
  isLoggedIn: !!localStorage.getItem(TOKEN_KEY),

  login: async (username, password) => {
    try {
      const token = await authService.login(username, password);
      localStorage.setItem(TOKEN_KEY, token);
      set({ token, isLoggedIn: true });
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  register: async (formData) => {
    try {
      await authService.register(formData);
    } catch (error) {
      throw new Error('Registration failed');
    }
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null, isLoggedIn: false });
  },

  isTokenExpired: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return true;

    const tokenData = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= tokenData.exp * 1000;
  },

  renewToken: async () => {
    if (useStore.getState().isTokenExpired()) {
      const newToken = await authService.renewToken();
      localStorage.setItem(TOKEN_KEY, newToken);
      set({ token: newToken, isLoggedIn: true });
    }
  },
}));

export default useStore;


