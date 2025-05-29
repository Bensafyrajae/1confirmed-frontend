// src/services/userService.js
import api from './api';

export const userService = {
  updateUser: (id, userData) => api.post(`/users/${id}`, userData)
};