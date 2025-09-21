import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Music } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

function NotFound() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Music className={`w-24 h-24 mx-auto mb-4 ${
            theme === 'dark' ? 'text-purple-400' : 'text-purple-500'
          }`} />
          <h1 className="text-6xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className={`text-lg mb-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <div className="flex justify-center space-x-4 text-sm">
            <Link
              to="/search"
              className={`hover:underline ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-500'
              }`}
            >
              Search Music
            </Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>•</span>
            <Link
              to="/settings"
              className={`hover:underline ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-500'
              }`}
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;