import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Home, User, Settings, LogOut, Moon, Sun, Music } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const navLinks = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900/95 backdrop-blur-sm border-gray-800' 
        : 'bg-white/95 backdrop-blur-sm border-gray-200'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-purple-500 hover:text-purple-400 transition-colors">
            <Music className="w-8 h-8" />
            <span className="text-xl font-bold">MusicStream</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === path
                    ? 'text-purple-500 bg-purple-500/10'
                    : theme === 'dark' 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden md:block text-sm font-medium">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm w-full text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;