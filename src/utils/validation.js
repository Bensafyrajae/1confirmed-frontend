import { PHONE_REGEX, EMAIL_REGEX } from './constants';

export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

export const validatePhone = (phone) => {
  return PHONE_REGEX.test(phone);
};

export const validateRequired = (value, fieldName = 'Ce champ') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} est requis`;
  }
  return null;
};

export const validateMinLength = (value, minLength, fieldName = 'Ce champ') => {
  if (value && value.length < minLength) {
    return `${fieldName} doit contenir au moins ${minLength} caractères`;
  }
  return null;
};

export const validateMaxLength = (value, maxLength, fieldName = 'Ce champ') => {
  if (value && value.length > maxLength) {
    return `${fieldName} ne peut pas dépasser ${maxLength} caractères`;
  }
  return null;
};