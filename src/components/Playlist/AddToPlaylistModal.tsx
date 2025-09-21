import React, { useState } from 'react';
import { X, Plus, Music } from 'lucide-react';
import { Song } from '../../contexts/PlayerContext';
import { usePlaylist } from '../../contexts/PlaylistContext';
import { useTheme } from '../../contexts/ThemeContext';

interface AddToPlaylistModalProps {
  song: Song;
  onClose: () => void;
}

function AddToPlaylistModal({ song, onClose }: AddToPlaylistModalProps) {
  const { playlists, addSongToPlaylist, createPlaylist } = usePlaylist();
  const { theme } = useTheme();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleAddToPlaylist = (playlistId: string) => {
    addSongToPlaylist(playlistId, song);
    onClose();
  };

  const handleCreateAndAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    try {
      await createPlaylist(newPlaylistName.trim(), '');
      // Get the newly created playlist (it will be the last one)
      const newPlaylist = playlists[playlists.length - 1];
      if (newPlaylist) {
        addSongToPlaylist(newPlaylist.id, song);
      }
      onClose();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`w-full max-w-md max-h-96 mx-4 rounded-lg shadow-xl ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Add to Playlist</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
            <img
              src={song.coverUrl}
              alt={song.title}
              className="w-10 h-10 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{song.title}</h4>
              <p className={`text-sm truncate ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {song.artist}
              </p>
            </div>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {/* Create New Playlist Option */}
            <div className={`p-3 rounded-lg border-2 border-dashed transition-colors ${
              theme === 'dark' 
                ? 'border-gray-600 hover:border-purple-500 hover:bg-gray-700' 
                : 'border-gray-300 hover:border-purple-500 hover:bg-gray-50'
            }`}>
              {showCreateForm ? (
                <form onSubmit={handleCreateAndAdd} className="space-y-3">
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="Playlist name"
                    className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'dark' 
                        ? 'bg-gray-900 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    autoFocus
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      disabled={!newPlaylistName.trim()}
                      className="flex-1 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewPlaylistName('');
                      }}
                      className={`flex-1 px-3 py-2 rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="flex items-center space-x-2 w-full text-left"
                >
                  <Plus className="w-5 h-5 text-purple-500" />
                  <span>Create new playlist</span>
                </button>
              )}
            </div>

            {/* Existing Playlists */}
            {playlists.map((playlist) => {
              const songAlreadyInPlaylist = playlist.songs.some(s => s.id === song.id);
              
              return (
                <button
                  key={playlist.id}
                  onClick={() => !songAlreadyInPlaylist && handleAddToPlaylist(playlist.id)}
                  disabled={songAlreadyInPlaylist}
                  className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                    songAlreadyInPlaylist
                      ? 'opacity-50 cursor-not-allowed'
                      : theme === 'dark' 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                  }`}
                >
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h4 className="font-medium">{playlist.name}</h4>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {playlist.songs.length} songs
                      {songAlreadyInPlaylist && ' • Already added'}
                    </p>
                  </div>
                </button>
              );
            })}

            {playlists.length === 0 && (
              <div className="text-center py-6">
                <Music className={`w-12 h-12 mx-auto mb-3 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  No playlists found. Create your first playlist above.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToPlaylistModal;