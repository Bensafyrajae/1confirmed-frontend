// src/services/creditsService.js
import api from './api';

export const creditsService = {
  getCredits: () => api.get('/credits'),
  
  getCreditsHistory: () => api.get('/credits/history')
};