// src/pages/Settings.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Settings as SettingsIcon, User, Globe, Key, Bell, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../stores/authStore';
import { languageService } from '../services/languageService';
import { userService } from '../services/userService';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, updateUser, saveConfirmedToken } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: languages } = useQuery('languages', languageService.getLanguages);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      agencyName: user?.agencyName || '',
      email: user?.email || '',
      languageId: user?.languageId || 1
    }
  });

  const updateUserMutation = useMutation(
    (data) => userService.updateUser(user.id, data),
    {
      onSuccess: (response) => {
        updateUser(response.data);
        toast.success('Profil mis à jour avec succès');
      },
      onError: () => {
        toast.error('Erreur lors de la mise à jour');
      }
    }
  );

  const updateLanguageMutation = useMutation(languageService.updateUserLanguage, {
    onSuccess: () => {
      queryClient.invalidateQueries('templates');
      toast.success('Langue mise à jour');
    }
  });

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'language', name: 'Langue', icon: Globe },
    { id: 'api', name: 'API 1Confirmed', icon: Key },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ];

  const onSubmitProfile = (data) => {
    updateUserMutation.mutate(data);
  };

  const handleLanguageChange = (languageId) => {
    updateLanguageMutation.mutate({ languageId: parseInt(languageId) });
    updateUser({ languageId: parseInt(languageId) });
  };

  const handleSaveToken = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const token = formData.get('confirmedToken');
    
    if (token) {
      saveConfirmedToken(token)
        .then(() => toast.success('Token 1Confirmed enregistré'))
        .catch(() => toast.error('Erreur lors de l\'enregistrement du token'));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <SettingsIcon className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
            <p className="text-gray-600">Gérez vos préférences et configurations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations du profil</h2>
                <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'agence
                    </label>
                    <input
                      type="text"
                      {...register('agencyName', { required: 'Nom requis' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.agencyName && (
                      <p className="mt-1 text-sm text-red-600">{errors.agencyName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email requis' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={updateUserMutation.isLoading}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {updateUserMutation.isLoading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </form>
              </div>
            )}

            {/* Language Tab */}
            {activeTab === 'language' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Préférences de langue</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Sélectionnez la langue pour les modèles de messages WhatsApp
                  </p>
                  
                  {languages?.data?.map((language) => (
                    <label key={language.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="language"
                        value={language.id}
                        checked={user?.languageId === language.id}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{language.name}</p>
                        <p className="text-sm text-gray-500">{language.code}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* API Tab */}
            {activeTab === 'api' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuration API 1Confirmed</h2>
                <form onSubmit={handleSaveToken} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Token API 1Confirmed
                    </label>
                    <input
                      type="password"
                      name="confirmedToken"
                      defaultValue={user?.confirmedToken || ''}
                      placeholder="Entrez votre token API 1Confirmed"className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   />
                   <p className="mt-1 text-sm text-gray-500">
                     Ce token permet d'envoyer des messages via l'API 1Confirmed
                   </p>
                 </div>

                 <div className="bg-blue-50 p-4 rounded-lg">
                   <h4 className="font-medium text-blue-900 mb-2">Comment obtenir votre token ?</h4>
                   <ol className="text-sm text-blue-800 space-y-1">
                     <li>1. Connectez-vous à votre compte 1Confirmed</li>
                     <li>2. Allez dans "Paramètres" → "API"</li>
                     <li>3. Copiez votre token API</li>
                     <li>4. Collez-le dans le champ ci-dessus</li>
                   </ol>
                 </div>

                 <button
                   type="submit"
                   className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                 >
                   <Save className="h-4 w-4 mr-2" />
                   Enregistrer le token
                 </button>
               </form>
             </div>
           )}

           {/* Notifications Tab */}
           {activeTab === 'notifications' && (
             <div>
               <h2 className="text-xl font-semibold text-gray-900 mb-6">Préférences de notifications</h2>
               <div className="space-y-6">
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                   <div>
                     <p className="font-medium text-gray-900">Messages envoyés</p>
                     <p className="text-sm text-gray-500">Recevoir une notification quand un message est envoyé</p>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" className="sr-only peer" defaultChecked />
                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                   </label>
                 </div>

                 <div className="flex items-center justify-between p-4 border rounded-lg">
                   <div>
                     <p className="font-medium text-gray-900">Nouveaux clients</p>
                     <p className="text-sm text-gray-500">Recevoir une notification quand un client est ajouté</p>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" className="sr-only peer" defaultChecked />
                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                   </label>
                 </div>

                 <div className="flex items-center justify-between p-4 border rounded-lg">
                   <div>
                     <p className="font-medium text-gray-900">Crédits faibles</p>
                     <p className="text-sm text-gray-500">Recevoir une alerte quand les crédits sont faibles</p>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" className="sr-only peer" defaultChecked />
                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                   </label>
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>
     </div>
   </div>
 );
};

export default Settings;