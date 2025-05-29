// src/utils/constants.js
export const APP_NAME = 'ImmoConnect';

export const API_ENDPOINTS = {
  AUTH: '/auth',
  CLIENTS: '/clients',
  MESSAGES: '/messages',
  TEMPLATES: '/templates',
  CREDITS: '/credits',
  DASHBOARD: '/dashboard',
  LANGUAGES: '/languages',
  USERS: '/users'
};

export const MESSAGE_STATUS = {
  PENDING: 'pending',
  DELIVERED: 'delivered',
  FAILED: 'failed'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

export const PHONE_REGEX = /^(\+212|0)[5-7]\d{8}$/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;