import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FileText, Search, Filter, Eye, Globe } from 'lucide-react';
import { templateService } from '../services/templateService';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: templates, isLoading } = useQuery('templates', templateService.getTemplates);
  console.log('Templates data:', templates);
  

  const filteredTemplates = Array.isArray(templates?.data.data) ? templates.data.data.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  const categories = [
    { value: 'all', label: 'Tous les modèles' },
    { value: 'presentation', label: 'Présentation' },
    { value: 'relance', label: 'Relance' },
    { value: 'confirmation', label: 'Confirmation' },
    { value: 'information', label: 'Information' }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Modèles de messages</h1>
            <p className="text-gray-600 mt-1">
              {filteredTemplates.length} modèle{filteredTemplates.length > 1 ? 's' : ''} disponible{filteredTemplates.length > 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-2 text-sm text-gray-500">
            <Globe className="h-4 w-4" />
            <span>1Confirmed Templates</span>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un modèle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500">ID: {template.id}</p>
                </div>
              </div>
            </div>

            {/* Template preview */}
            {template.body && (
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-700 line-clamp-3">
                  {template.body}
                </p>
              </div>
            )}

            {/* Variables info */}
            {(template.variables?.length > 0 || template.global_variables?.length > 0) && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Variables requises:</p>
                <div className="flex flex-wrap gap-1">
                  {template.variables?.map((variable, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {variable.name}
                    </span>
                  ))}
                  {template.global_variables?.map((variable, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                      {variable.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
                <Eye className="h-4 w-4 mr-1" />
                Aperçu
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun modèle trouvé</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Essayez de modifier votre recherche' : 'Aucun modèle disponible pour le moment'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Templates;