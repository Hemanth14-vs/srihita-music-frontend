import React, { useState } from 'react';
import { Volume2, Download, Bell, Shield, Moon, Sun, Smartphone, Laptop, Wifi } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [playbackQuality, setPlaybackQuality] = useState('high');
  const [downloadQuality, setDownloadQuality] = useState('high');
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  const qualityOptions = [
    { value: 'low', label: 'Low (96 kbps)', description: 'Uses less data' },
    { value: 'normal', label: 'Normal (160 kbps)', description: 'Balanced quality and data usage' },
    { value: 'high', label: 'High (320 kbps)', description: 'Best quality, uses more data' },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Customize your music streaming experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Account Section */}
          {user && (
            <div className={`p-6 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-sm`}>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Account
              </h2>
              
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Section */}
          <div className={`p-6 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-sm`}>
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <div>
                  <h3 className="font-medium">Theme</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Choose your preferred theme
                  </p>
                </div>
              </div>
              
              <button
                onClick={toggleTheme}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  theme === 'dark' ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Playback Section */}
          <div className={`p-6 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-sm`}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Volume2 className="w-5 h-5 mr-2" />
              Playback
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Streaming Quality</h3>
                <div className="space-y-2">
                  {qualityOptions.map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="playbackQuality"
                        value={option.value}
                        checked={playbackQuality === option.value}
                        onChange={(e) => setPlaybackQuality(e.target.value)}
                        className="w-4 h-4 text-purple-500 focus:ring-purple-500"
                      />
                      <div>
                        <span className="font-medium">{option.label}</span>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {option.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Downloads Section */}
          <div className={`p-6 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-sm`}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Downloads
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Download Quality</h3>
                <div className="space-y-2">
                  {qualityOptions.map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="downloadQuality"
                        value={option.value}
                        checked={downloadQuality === option.value}
                        onChange={(e) => setDownloadQuality(e.target.value)}
                        className="w-4 h-4 text-purple-500 focus:ring-purple-500"
                      />
                      <div>
                        <span className="font-medium">{option.label}</span>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {option.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Wifi className="w-5 h-5" />
                  <div>
                    <h3 className="font-medium">Offline Mode</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Show only downloaded music
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setOfflineMode(!offlineMode)}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    offlineMode ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                    offlineMode ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className={`p-6 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-sm`}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </h2>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Get notified about new releases and recommendations
                </p>
              </div>
              
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  notifications ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Device Section */}
          <div className={`p-6 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-sm`}>
            <h2 className="text-xl font-semibold mb-4">Devices</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <Laptop className="w-5 h-5 text-purple-500" />
                <div className="flex-1">
                  <h3 className="font-medium">This Browser</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Currently active
                  </p>
                </div>
                <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                <Smartphone className="w-5 h-5" />
                <div className="flex-1">
                  <h3 className="font-medium">Mobile Device</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Last active 2 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;