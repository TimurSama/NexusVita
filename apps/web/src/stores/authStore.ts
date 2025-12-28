import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api, authApi, User, LoginCredentials, RegisterData } from '@/lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  clearError: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(credentials);
          if (response.error) {
            set({ error: response.error, isLoading: false });
            return false;
          }
          if (response.data) {
            api.setToken(response.data.token);
            set({
              token: response.data.token,
              user: {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                role: response.data.role,
                createdAt: new Date().toISOString(),
              },
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          }
          return false;
        } catch (error) {
          set({ error: 'Ошибка при входе', isLoading: false });
          return false;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(data);
          if (response.error) {
            set({ error: response.error, isLoading: false });
            return false;
          }
          if (response.data) {
            api.setToken(response.data.token);
            set({
              token: response.data.token,
              user: {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                role: response.data.role,
                createdAt: new Date().toISOString(),
              },
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          }
          return false;
        } catch (error) {
          set({ error: 'Ошибка при регистрации', isLoading: false });
          return false;
        }
      },

      logout: () => {
        api.setToken(null);
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      fetchUser: async () => {
        const token = get().token;
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        set({ isLoading: true });
        try {
          api.setToken(token);
          const response = await authApi.getMe();
          if (response.data) {
            set({
              user: response.data,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      clearError: () => set({ error: null }),

      setToken: (token: string) => {
        api.setToken(token);
        set({ token, isAuthenticated: true });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);


