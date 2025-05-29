// src/components/ui/MessageHistory.jsx
import React from 'react';
import { Phone, Clock } from 'lucide-react';

const MessageHistory = ({ messages, isLoading, getStatusIcon }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">
          <Clock className="h-12 w-12 mx-auto" />
        </div>
        <p className="text-gray-500">Aucun message envoyé</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {messages.slice(0, 10).map((message) => (
        <div key={message.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Phone className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">
                {message.phone}
              </p>
              <div className="flex items-center space-x-1">
                {getStatusIcon(message.status)}
                <span className="text-xs text-gray-500 capitalize">
                  {message.status}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 truncate">
              Template ID: {message.templateId}
            </p>
            
            <p className="text-xs text-gray-400 mt-1">
              {new Date(message.createdAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageHistory;