// src/components/layout/DashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuthStore } from '../../stores/authStore';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuthStore();

  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/dashboard': 'Tableau de bord',
      '/clients': 'Gestion des clients',
      '/messages': 'Messages WhatsApp',
      '/templates': 'Modèles de messages',
      '/credits': 'Crédits 1Confirmed',
      '/settings': 'Paramètres',
    };
    return titles[path] || 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="lg:pl-72">
        <Header 
          setSidebarOpen={setSidebarOpen}
          pageTitle={getPageTitle()}
          user={user}
        />
        
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;