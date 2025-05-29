// src/hooks/useApi.js
import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, options = {}) => {
    const {
      showSuccessToast = false,
      successMessage = 'Opération réussie',
      showErrorToast = true,
      errorMessage = 'Une erreur est survenue'
    } = options;

    try {
      setLoading(true);
      setError(null);
      
      const result = await apiCall();
      
      if (showSuccessToast) {
        toast.success(successMessage);
      }
      
      return result;
    } catch (err) {
      const apiError = err.response?.data?.message || errorMessage;
      setError(apiError);
      
      if (showErrorToast) {
        toast.error(apiError);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
};