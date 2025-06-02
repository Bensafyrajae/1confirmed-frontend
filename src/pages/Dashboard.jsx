import React from 'react';
import { useQuery } from 'react-query';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  CreditCard,
  TrendingUp,
  Activity
} from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import StatsCard from '../components/ui/StatsCard';
import Chart from '../components/charts/Chart';
import RecentActivity from '../components/ui/RecentActivity';

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery('dashboard-stats', 
    dashboardService.getStats
  );

  if (isLoading) {
    return <div className="animate-pulse">Chargement...</div>;
  }

  const statsCards = [
    {
      title: 'Total Clients',
      value: stats?.totalClients || 0,
      icon: Users,
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Messages Envoyés',
      value: stats?.totalMessages || 0,
      icon: MessageSquare,
      color: 'green',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Modèles Disponibles',
      value: stats?.totalTemplates || 0,
      icon: FileText,
      color: 'purple',
      change: '+2',
      changeType: 'neutral'
    },
    {
      title: 'Crédits Restants',
      value: stats?.credits || 0,
      icon: CreditCard,
      color: 'orange',
      change: '-15',
      changeType: 'negative'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Tableau de bord
            </h1>
            <p className="text-gray-600 mt-1">
              Vue d'ensemble de votre activité immobilière
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Activity className="h-4 w-4" />
            <span>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Activité mensuelle
            </h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <Chart type="area" />
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Activité récente
          </h3>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;