import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, UserPlus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  followers: number;
  isFollowed?: boolean;
}

interface ArtistCardProps {
  artist: Artist;
  onToggleFollow?: (artistId: string) => void;
}

function ArtistCard({ artist, onToggleFollow }: ArtistCardProps) {
  const { theme } = useTheme();

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFollow?.(artist.id);
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Link
      to={`/artist/${artist.id}`}
      className={`group block p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
        theme === 'dark' 
          ? 'bg-gray-800 hover:bg-gray-700' 
          : 'bg-white hover:bg-gray-50'
      } shadow-sm hover:shadow-md`}
    >
      <div className="relative">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="w-full aspect-square object-cover rounded-full"
        />
        
        {onToggleFollow && (
          <button
            onClick={handleFollowClick}
            className={`absolute bottom-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ${
              artist.isFollowed
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
            aria-label={artist.isFollowed ? 'Unfollow artist' : 'Follow artist'}
          >
            {artist.isFollowed ? (
              <UserCheck className="w-4 h-4" />
            ) : (
              <UserPlus className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      
      <div className="mt-3 text-center">
        <h3 className="font-semibold text-lg truncate">{artist.name}</h3>
        <p className={`text-sm mt-1 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {formatFollowers(artist.followers)} followers
        </p>
      </div>
    </Link>
  );
}

export default ArtistCard;