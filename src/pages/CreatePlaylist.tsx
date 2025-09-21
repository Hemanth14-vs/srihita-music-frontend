import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Music } from 'lucide-react';
import { usePlaylist } from '../contexts/PlaylistContext';
import { useTheme } from '../contexts/ThemeContext';

function CreatePlaylist() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { createPlaylist } = usePlaylist();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      await createPlaylist(name.trim(), description.trim());
      navigate('/');
    } catch (error) {
      console.error('Error creating playlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultCovers = [
    'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-full transition-colors ${
              theme === 'dark' 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold">Create Playlist</h1>
        </div>

        {/* Form */}
        <div className={`p-8 rounded-lg shadow-sm ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Image Selection */}
            <div>
              <label className="block text-sm font-medium mb-4">Cover Image</label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {defaultCovers.map((cover, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCoverImage(cover)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                      coverImage === cover 
                        ? 'ring-2 ring-purple-500 scale-95' 
                        : 'hover:scale-95'
                    }`}
                  >
                    <img
                      src={cover}
                      alt={`Cover option ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {coverImage === cover && (
                      <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Upload (Mock) */}
              <button
                type="button"
                className={`w-full p-4 border-2 border-dashed rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'border-gray-600 hover:border-purple-500 text-gray-400 hover:text-purple-400' 
                    : 'border-gray-300 hover:border-purple-500 text-gray-600 hover:text-purple-600'
                }`}
              >
                <Upload className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm">Upload custom image</span>
              </button>
            </div>

            {/* Playlist Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Playlist Name *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter playlist name"
                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Privacy Settings */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Make playlist public</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Anyone can search and view your public playlist
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isPublic ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                  isPublic ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={!name.trim() || isLoading}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-400 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <Music className="w-4 h-4" />
                )}
                <span>{isLoading ? 'Creating...' : 'Create Playlist'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylist;