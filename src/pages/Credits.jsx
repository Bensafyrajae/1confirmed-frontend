import React from 'react';
import { useQuery } from 'react-query';
import { CreditCard, TrendingDown, Clock, Plus, ArrowUpRight } from 'lucide-react';
import { creditsService } from '../services/creditsService';
import Chart from '../components/charts/Chart';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Credits = () => {
  const { data: credits, isLoading } = useQuery('credits', creditsService.getCredits);
  const { data: history } = useQuery('credits-history', creditsService.getCreditsHistory);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const creditData = credits?.data || {};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des crédits</h1>
            <p className="text-gray-600 mt-1">
              Suivez votre consommation et rechargez vos crédits 1Confirmed
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-5 w-5 mr-2" />
            Recharger
          </button>
        </div>
      </div>

      {/* Credits overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Crédits restants</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {creditData.credits?.toLocaleString() || '0'}
              </p>
            </div>
            <div className="rounded-lg p-3 bg-blue-100 text-blue-600">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+50</span>
            <span className="text-gray-500 ml-1">cette semaine</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Consommés ce mois</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">127</p>
            </div>
            <div className="rounded-lg p-3 bg-orange-100 text-orange-600">
              <TrendingDown className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-orange-600">23%</span>
            <span className="text-gray-500 ml-1">vs mois dernier</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dernière recharge</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">500</p>
            </div>
            <div className="rounded-lg p-3 bg-green-100 text-green-600">
              <Clock className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Il y a 3 jours</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Usage chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Consommation mensuelle
          </h3>
          <Chart type="bar" height={250} />
        </div>

        {/* Transaction history */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Historique des transactions
          </h3>
          
          <div className="space-y-4">
            {Array.isArray(history?.data) ? history.data.slice(0, 8).map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    transaction.type === 'recharge' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${
                  transaction.type === 'recharge' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'recharge' ? '+' : '-'}{transaction.amount}
                </span>
              </div>
            )) : (
              <div className="text-center py-8">
                <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Aucune transaction</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;