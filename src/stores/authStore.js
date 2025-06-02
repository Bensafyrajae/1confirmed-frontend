import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          const { user, token } = response.data;
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          // Set axios default header
          authService.setAuthToken(token);
          
          return user;
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Erreur de connexion';
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false,
            user: null,
            token: null
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(userData);
          const { status, user, token } = response.data;

          set({
            user,
            token,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
          
          // Set axios default header
          authService.setAuthToken(token);
          
          return status;
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Erreur d\'inscription';
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false,
            user: null,
            token: null
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        });
        authService.setAuthToken(null);
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }));
      },

      saveConfirmedToken: async (token) => {
        try {
          await authService.saveConfirmedToken(token);
          set((state) => ({
            user: { ...state.user, confirmedToken: token }
          }));
        } catch (error) {
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      // Initialize auth state on app start
      initializeAuth: async () => {
        const { token } = get();
        if (token) {
          try {
            authService.setAuthToken(token);
            const response = await authService.getMe();
            const { user } = response.data.data;
            set({ user, isAuthenticated: true });
          } catch (error) {
            // Token is invalid, clear auth state
            set({
              user: null,
              token: null,
              isAuthenticated: false
            });
            authService.setAuthToken(null);
          }
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);