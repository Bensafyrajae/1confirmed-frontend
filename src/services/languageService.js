// src/services/languageService.js
import api from './api';

export const languageService = {
  getLanguages: () => api.get('/languages'),
  
  updateUserLanguage: (data) => api.put('/languages/select', data)
};