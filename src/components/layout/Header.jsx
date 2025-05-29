// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Menu, Bell, User, Search, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Header = ({ setSidebarOpen, pageTitle, user }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Page title */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
        </div>

        {/* Search bar */}
        <div className="relative flex flex-1 items-center justify-end">
          <div className="w-full max-w-lg">
            <label htmlFor="search" className="sr-only">
              Rechercher
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border-0 bg-gray-50 py-1.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
                placeholder="Rechercher..."
                type="search"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <Bell className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

          {/* Profile dropdown */}
          <div className="relative">
            <button
              type="button"
              className="-m-1.5 flex items-center p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className="sr-only">Ouvrir le menu utilisateur</span>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.agencyName?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                  {user?.agencyName}
                </span>
                <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
              </span>
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <a
                  href="#"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                >
                  Profil
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;