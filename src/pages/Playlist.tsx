import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, MoreHorizontal, Edit, Trash2, Share, Download } from 'lucide-react';
import { usePlaylist } from '../contexts/PlaylistContext';
import { usePlayer } from '../contexts/PlayerContext';
import { useTheme } from '../contexts/ThemeContext';
import SongList from '../components/Playlist/SongList';
import { formatTime } from '../utils/formatters';

function Playlist() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPlaylistById, deletePlaylist, removeSongFromPlaylist } = usePlaylist();
  const { currentSong, isPlaying, setQueue, play, pause } = usePlayer();
  const { theme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  
  const playlist = id ? getPlaylistById(id) : null;

  useEffect(() => {
    if (!playlist) {
      navigate('/');
    }
  }, [playlist, navigate]);

  if (!playlist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Playlist not found
        </p>
      </div>
    );
  }

  const totalDuration = playlist.songs.reduce((acc, song) => acc + song.duration, 0);
  const isCurrentPlaylist = playlist.songs.some(song => song.id === currentSong?.id);

  const handlePlayPause = () => {
    if (playlist.songs.length === 0) return;

    if (isCurrentPlaylist && currentSong) {
      isPlaying ? pause() : play();
    } else {
      setQueue(playlist.songs, 0);
    }
  };

  const handleDeletePlaylist = () => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      deletePlaylist(playlist.id);
      navigate('/');
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/playlist/${playlist.id}`;
    if (navigator.share) {
      navigator.share({
        title: playlist.name,
        text: `Check out this playlist: ${playlist.name}`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Playlist link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Playlist Header */}
      <div className={`relative p-8 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-purple-900/50 to-gray-900' 
          : 'bg-gradient-to-b from-purple-100 to-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end space-x-6">
            <img
              src={playlist.coverUrl}
              alt={playlist.name}
              className="w-48 h-48 rounded-lg shadow-2xl object-cover"
            />
            
            <div className="flex-1 space-y-4">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  PLAYLIST
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mt-2 leading-tight">
                  {playlist.name}
                </h1>
                {playlist.description && (
                  <p className={`text-lg mt-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {playlist.description}
                  </p>
                )}
              </div>
              
              <div className={`flex items-center space-x-2 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span>{playlist.songs.length} songs</span>
                {totalDuration > 0 && (
                  <>
                    <span>•</span>
                    <span>{formatTime(totalDuration)}</span>
                  </>
                )}
                <span>•</span>
                <span>Created {new Date(playlist.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-6 mb-8">
            <button
              onClick={handlePlayPause}
              disabled={playlist.songs.length === 0}
              className="p-4 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-full transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed"
            >
              {isCurrentPlaylist && isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`p-3 rounded-full transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {showMenu && (
                <div className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg border z-10 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <button
                    onClick={handleShare}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm w-full text-left transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    } rounded-t-lg`}
                  >
                    <Share className="w-4 h-4" />
                    <span>Share playlist</span>
                  </button>
                  
                  <button
                    className={`flex items-center space-x-2 px-4 py-3 text-sm w-full text-left transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download playlist</span>
                  </button>
                  
                  <button
                    className={`flex items-center space-x-2 px-4 py-3 text-sm w-full text-left transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit details</span>
                  </button>
                  
                  <button
                    onClick={handleDeletePlaylist}
                    className="flex items-center space-x-2 px-4 py-3 text-sm w-full text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete playlist</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Songs List */}
          <div className="space-y-4">
            {playlist.songs.length > 0 ? (
              <SongList 
                songs={playlist.songs} 
                onRemoveSong={(songId) => removeSongFromPlaylist(playlist.id, songId)}
              />
            ) : (
              <div className="text-center py-12">
                <p className={`text-lg font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  This playlist is empty
                </p>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Search for music and add songs to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playlist;