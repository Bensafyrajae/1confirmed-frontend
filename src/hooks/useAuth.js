// src/hooks/useAuth.js
import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const { user, isAuthenticated, login, logout, register } = useAuthStore();

  return {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    isLoggedIn: isAuthenticated && !!user
  };
};