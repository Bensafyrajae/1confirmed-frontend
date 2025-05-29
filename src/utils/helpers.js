// src/utils/helpers.js
export const formatPhoneNumber = (phone) => {
  const digits = phone.replace(/\D/g, '');
  
  if (!digits.startsWith('+212')) {
    if (digits.startsWith('0')) {
      return `+212${digits.slice(1)}`;
    }
    return `+212${digits}`;
  }
  return digits;
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Date(date).toLocaleDateString('fr-FR', defaultOptions);
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};