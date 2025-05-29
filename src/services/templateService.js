// src/services/templateService.js
import api from './api';

export const templateService = {
  getTemplates: () => api.get('/templates')
};