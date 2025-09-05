import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Settings } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Complaint Management
            </h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Submit Complaint
            </Link>
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                location.pathname === '/admin'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
