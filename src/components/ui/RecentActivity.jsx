// src/components/ui/RecentActivity.jsx
import React from 'react';
import { MessageSquare, UserPlus, FileText, Clock } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'message',
      title: 'Message envoyé à Marie Dubois',
      description: 'Modèle: Présentation bien immobilier',
      time: 'Il y a 5 min',
      icon: MessageSquare,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 2,
      type: 'client',
      title: 'Nouveau client ajouté',
      description: 'Jean Martin - 06 12 34 56 78',
      time: 'Il y a 15 min',
      icon: UserPlus,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 3,
      type: 'template',
      title: 'Modèle utilisé',
      description: 'Relance prospect',
      time: 'Il y a 1h',
      icon: FileText,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 4,
      type: 'message',
      title: 'Message envoyé à Pierre Durand',
      description: 'Modèle: Confirmation RDV',
      time: 'Il y a 2h',
      icon: MessageSquare,
      color: 'text-blue-600 bg-blue-100'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div className={`rounded-lg p-2 ${activity.color}`}>
            <activity.icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {activity.title}
            </p>
            <p className="text-sm text-gray-500">
              {activity.description}
            </p>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;