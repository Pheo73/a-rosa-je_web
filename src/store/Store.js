import { create } from "zustand";
import authService from "../services/authService";
import planteService from "../services/planteService";

const TOKEN_KEY = "auth_token";

const useStore = create((set) => ({
  token: localStorage.getItem(TOKEN_KEY) || null,
  isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
  sun: [],
  temp: [],
  water: [],
  user:{},
  offers:[],
  registerSuccess: false,
  setRegisterSuccess: (value) => set({ registerSuccess: value }),  login: async (username, password) => {
    try {
      const token = await authService.login(username, password);
      localStorage.setItem(TOKEN_KEY, token);
      set({ token, isLoggedIn: true });
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },
  register: async (formData) => {
    try {
      await authService.register(formData);
      set({ registerSuccess: true });
    } catch (error) {
      throw new Error("Registration failed");
    }
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null, isLoggedIn: false });
  },
  isTokenExpired: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return true;

    const tokenData = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= tokenData.exp * 1000;
  },
  renewToken: async () => {
    if (useStore.getState().isTokenExpired()) {
      const newToken = await authService.renewToken();
      localStorage.setItem(TOKEN_KEY, newToken);
      set({ token: newToken, isLoggedIn: true });
    }
  },
  getSelectValue: async () => {
    try {
      const token = useStore.getState().token;
      const sun = await planteService.sunExpo(token);
      const temp = await planteService.temperatureRanges(token);
      const water = await planteService.waterAmount(token);

      set({ sun, temp, water });
    } catch (error) {
      console.error("Error fetching select values:", error);
      throw error;
    }
  },
  getUser:async()=>{
    try {
      const token = useStore.getState().token;
      const user = await authService.displayUser(token);
      set ({user});
    }catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  },
  getOffer:async()=>{
    try {
      const token = useStore.getState().token;
      const offers = await planteService.getOffers(token);
      set ({offers});
    }catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  }
}));

export default useStore;
