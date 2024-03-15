import { create } from 'zustand'; // Importez la fonction create depuis zustand
import authService from '../services/authService'; // Assurez-vous que le chemin est correct

// Créez le store Zustand
const useStore = create((set) => ({
  token: null,
  isLoggedIn: false,
  // Déclarez la fonction login de manière cohérente
  login: async (username, password) => {
    try {
      // Appel de la fonction login de authService
      const token = await authService.login(username, password);
      // Mettez à jour le store avec le token et isLoggedIn
      set({ token, isLoggedIn: true });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  },
  register: async (formData) => {
    try {
      await authService.register(formData);
    } catch (error) {
      throw new Error('Registration failed');
    }
  },
}));

export default useStore; // Exportez le store Zustand
