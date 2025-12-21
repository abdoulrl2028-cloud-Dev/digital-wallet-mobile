import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { User } from '@carteira-digital/shared-types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkToken: (token: string) => void;
  refreshToken: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  cpf: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });

      const response = await fetch('https://api.carteira-digital.com/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Falha ao fazer login');
      }

      const data = await response.json();
      const { accessToken, user } = data;

      await AsyncStorage.setItem('auth_token', accessToken);
      set({
        user,
        token: accessToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (userData: RegisterData) => {
    try {
      set({ isLoading: true });

      const response = await fetch('https://api.carteira-digital.com/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Falha ao registrar');
      }

      const data = await response.json();
      const { accessToken, user } = data;

      await AsyncStorage.setItem('auth_token', accessToken);
      set({
        user,
        token: accessToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  },

  checkToken: (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp > currentTime) {
        set({
          token,
          isAuthenticated: true,
          user: decoded.user,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Erro ao validar token:', error);
      set({ isLoading: false });
    }
  },

  refreshToken: async () => {
    try {
      const response = await fetch('https://api.carteira-digital.com/v1/auth/refresh', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar token');
      }

      const data = await response.json();
      const { accessToken } = data;

      await AsyncStorage.setItem('auth_token', accessToken);
      set({ token: accessToken });
    } catch (error) {
      console.error('Erro ao atualizar token:', error);
      throw error;
    }
  },
}));
