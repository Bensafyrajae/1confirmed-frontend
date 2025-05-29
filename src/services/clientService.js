// src/services/clientService.js
import api from './api';

export const clientService = {
  getClients: () => api.get('/clients'),
  
  createClient: (clientData) => api.post('/clients', clientData),
  
  updateClient: (id, clientData) => api.put(`/clients/${id}`, clientData),
  
  deleteClient: (id) => api.delete(`/clients/${id}`),
  
  getClient: (id) => api.get(`/clients/${id}`)
};