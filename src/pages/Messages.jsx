// src/pages/Messages.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Send, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { messageService } from '../services/messageService';
import { templateService } from '../services/templateService';
import { clientService } from '../services/clientService';
import MessageComposer from '../components/forms/MessageComposer';
import MessageHistory from '../components/ui/MessageHistory';
import { toast } from 'react-hot-toast';

const Messages = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const queryClient = useQueryClient();

  const { data: templates } = useQuery('templates', templateService.getTemplates);
  const { data: clients } = useQuery('clients', clientService.getClients);
  const { data: messages, isLoading } = useQuery('messages', messageService.getMessages);

  const sendMessageMutation = useMutation(messageService.sendMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries('messages');
      toast.success('Message envoyé avec succès!');
      setSelectedTemplate(null);
      setSelectedClient(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'envoi');
    }
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Centre de messages</h1>
            <p className="text-gray-600 mt-1">
              Envoyez des messages WhatsApp personnalisés à vos clients
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MessageSquare className="h-4 w-4" />
            <span>{messages?.length || 0} messages envoyés</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Message Composer */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Send className="h-5 w-5 mr-2 text-blue-600" />
            Nouveau message
          </h2>
          
          <MessageComposer
            templates={templates?.data || []}
            clients={clients?.data || []}
            onSend={(data) => sendMessageMutation.mutate(data)}
            isLoading={sendMessageMutation.isLoading}
          />
        </div>

        {/* Message History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Historique des messages
          </h2>
          
          <MessageHistory
            messages={messages || []}
            isLoading={isLoading}
            getStatusIcon={getStatusIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;