// src/services/messageService.js
import api from './api';

export const messageService = {
  getMessages: () => api.get('/messages'),
  
  sendMessage: (messageData) => api.post('/messages', messageData)
};