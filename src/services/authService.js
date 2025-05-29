import api from './api';

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  
  register: (userData) => api.post('/auth/register', userData),

  logout: () => api.post('/auth/logout'),
  
  getMe: () => api.get('/auth/me'),
  
  saveConfirmedToken: (token) => api.post('/auth/save-token', { token }),
  
  setAuthToken: (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }
};