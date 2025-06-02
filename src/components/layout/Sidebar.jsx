// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  MessageSquare, 
  FileText, 
  CreditCard, 
  Settings,
  X,
  Building2
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { user } = useAuthStore();

  const navigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: Home },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Modèles', href: '/templates', icon: FileText },
    { name: 'Crédits', href: '/credits', icon: CreditCard },
    { name: 'Paramètres', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 z-50 flex w-72 flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">1Confirmed</h1>
              <p className="text-xs text-gray-500">{user?.agencyName}</p>
            </div>
          </div>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden rounded-md p-2 text-gray-400 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col px-6 pb-4">
          <ul className="flex flex-1 flex-col gap-y-1 pt-6">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`
                      group flex gap-x-3 rounded-md p-3 text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }
                    `}
                  >
                    <item.icon 
                      className={`h-5 w-5 shrink-0 ${
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                      }`} 
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Credits display */}
          <div className="mt-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Crédits restants</p>
                <p className="text-2xl font-bold text-blue-600">{user?.credits || 0}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;