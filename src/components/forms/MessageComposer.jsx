// src/components/forms/MessageComposer.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Users, FileText, Globe } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';

const MessageComposer = ({ templates, clients, onSend, isLoading }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateVariables, setTemplateVariables] = useState({});
  const [globalVariables, setGlobalVariables] = useState({});
  const [catchVariables, setCatchVariables] = useState({});

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  
  const selectedTemplateId = watch('templateId');
  const selectedClientId = watch('clientId');

  useEffect(() => {
    if (selectedTemplateId) {
      const template = templates.find(t => t.id === parseInt(selectedTemplateId));
      setSelectedTemplate(template);
      
      // Reset variables when template changes
      setTemplateVariables({});
      setGlobalVariables({});
      setCatchVariables({});
    }
  }, [selectedTemplateId, templates]);

  const onSubmit = (data) => {
    const selectedClient = clients.find(c => c.id === parseInt(data.clientId));
    
    if (!selectedClient || !selectedTemplate) return;

    const payload = {
      phone: selectedClient.phone,
      templateId: selectedTemplate.id,
      countryId: 1, // Default Morocco
      data: templateVariables,
      globalData: globalVariables,
      catchData: catchVariables
    };

    onSend(payload);
  };

  const renderVariableInputs = (variables, title, setter, values) => {
    if (!variables?.length) return null;

    return (
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 flex items-center">
          <Globe className="h-4 w-4 mr-2" />
          {title}
        </h4>
        {variables.map((variable) => (
          <div key={variable.variable}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {variable.name}
            </label>
            <input
              type="text"
              value={values[variable.variable] || ''}
              onChange={(e) => setter(prev => ({
                ...prev,
                [variable.variable]: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Entrez ${variable.name.toLowerCase()}`}
              required
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Client Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Users className="inline h-4 w-4 mr-1" />
          Sélectionner un client
        </label>
        <select
          {...register('clientId', { required: 'Client requis' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choisir un client...</option>
          {Array.isArray(clients) ? clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name} - {client.phone}
            </option>
          )) : null}
        </select>
        {errors.clientId && (
          <p className="mt-1 text-sm text-red-600">{errors.clientId.message}</p>
        )}
      </div>

      {/* Template Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="inline h-4 w-4 mr-1" />
          Sélectionner un modèle
        </label>
        <select
          {...register('templateId', { required: 'Modèle requis' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choisir un modèle...</option>
          {Array.isArray(templates) ? templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          )) : null}
        </select>
        {errors.templateId && (
          <p className="mt-1 text-sm text-red-600">{errors.templateId.message}</p>
        )}
      </div>

      {/* Template Preview */}
      {selectedTemplate && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Aperçu du modèle</h4>
          <p className="text-sm text-gray-700 mb-2">{selectedTemplate.name}</p>
          {selectedTemplate.body && (
            <div className="bg-white p-3 rounded border text-sm">
              {selectedTemplate.body}
            </div>
          )}
        </div>
      )}

      {/* Template Variables */}
      {selectedTemplate?.variables && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Variables du modèle</h4>
          {selectedTemplate.variables.map((variable, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {variable.name}
              </label>
              <input
                type="text"
                value={templateVariables[variable.name] || ''}
                onChange={(e) => setTemplateVariables(prev => ({
                  ...prev,
                  [variable.name]: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Entrez ${variable.name.toLowerCase()}`}
                required
              />
            </div>
          ))}
        </div>
      )}

      {/* Global Variables */}
      {renderVariableInputs(
        selectedTemplate?.global_variables,
       'Variables globales',
       setGlobalVariables,
       globalVariables
     )}

     {/* Catch Data */}
     {renderVariableInputs(
       selectedTemplate?.catch_data,
       'Données supplémentaires',
       setCatchVariables,
       catchVariables
     )}

     {/* Submit Button */}
     <button
       type="submit"
       disabled={isLoading || !selectedTemplate || !selectedClientId}
       className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
     >
       {isLoading ? (
         <>
           <LoadingSpinner size="sm" color="white" />
           <span className="ml-2">Envoi en cours...</span>
         </>
       ) : (
         <>
           <Send className="h-4 w-4 mr-2" />
           Envoyer le message
         </>
       )}
     </button>
   </form>
 );
};

export default MessageComposer;