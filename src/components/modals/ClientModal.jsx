// src/components/modals/ClientModal.jsx
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import Modal from '../ui/Modal';
import ClientForm from '../forms/ClientForm';
import { clientService } from '../../services/clientService';

const ClientModal = ({ isOpen, onClose, client }) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data) => {
      // Validate data before sending
      if (!data.name || !data.email) {
        throw new Error('Name and email are required');
      }
      return clientService.createClient(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
      toast.success('Client ajouté avec succès');
      onClose();
    },
    onError: (error) => {
      console.error('Create client error:', error);
      toast.error(
        error.response?.data?.message || error.message || 'Erreur lors de la création'
      );
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data) => {
      if (!client?.id) {
        throw new Error('Client ID is required for update');
      }
      return clientService.updateClient(client.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
      toast.success('Client modifié avec succès');
      onClose();
    },
    onError: (error) => {
      console.error('Update client error:', error);
      toast.error(
        error.response?.data?.message || error.message || 'Erreur lors de la modification'
      );
    }
  });

  const handleSubmit = async (data) => {
    try {
      // Clean and validate the data
      const cleanedData = {
        name: data.name?.trim(),
        email: data.email?.trim(),
        phone: data.phone?.trim(),
        // Add other fields as needed
      };

      if (client) {
        await updateMutation.mutateAsync(cleanedData);
      } else {
        await createMutation.mutateAsync(cleanedData);
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={client ? 'Modifier le client' : 'Ajouter un client'}
      size="md"
    >
      <ClientForm
        client={client}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={createMutation.isLoading || updateMutation.isLoading}
      />
    </Modal>
  );
};

export default ClientModal;