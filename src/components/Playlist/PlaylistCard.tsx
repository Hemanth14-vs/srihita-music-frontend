import React from 'react';
import { Link } from 'react-router-dom';
import { Play, MoreHorizontal } from 'lucide-react';
import { Playlist } from '../../contexts/PlaylistContext';
import { useTheme } from '../../contexts/ThemeContext';
import { usePlayer } from '../../contexts/PlayerContext';

interface PlaylistCardProps {
  playlist: Playlist;
  showPlayButton?: boolean;
}

function PlaylistCard({ playlist, showPlayButton = true }: PlaylistCardProps) {
  const { theme } = useTheme();
  const { setQueue } = usePlayer();

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (playlist.songs.length > 0) {
      setQueue(playlist.songs, 0);
    }
  };

  return (
    <Link
      to={`/playlist/${playlist.id}`}
      className={`group block p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
        theme === 'dark' 
          ? 'bg-gray-800 hover:bg-gray-700' 
          : 'bg-white hover:bg-gray-50'
      } shadow-sm hover:shadow-md`}
    >
      <div className="relative">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-full aspect-square object-cover rounded-lg"
        />
        
        {showPlayButton && playlist.songs.length > 0 && (
          <button
            onClick={handlePlayClick}
            className="absolute bottom-2 right-2 p-3 bg-purple-500 text-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-purple-600 hover:scale-110"
            aria-label="Play playlist"
          >
            <Play className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="mt-3">
        <h3 className="font-semibold text-lg truncate">{playlist.name}</h3>
        <p className={`text-sm mt-1 truncate ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {playlist.description || `${playlist.songs.length} songs`}
        </p>
        
        {playlist.songs.length > 0 && (
          <p className={`text-xs mt-2 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </Link>
  );
}

export default PlaylistCard;