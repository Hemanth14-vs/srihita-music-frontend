import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, UserCheck, UserPlus, MoreHorizontal } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';
import { useTheme } from '../contexts/ThemeContext';
import SongList from '../components/Playlist/SongList';
import { Song } from '../contexts/PlayerContext';
import { formatNumber } from '../utils/formatters';

interface ArtistData {
  id: string;
  name: string;
  imageUrl: string;
  followers: number;
  isFollowed: boolean;
  topSongs: Song[];
  albums: Array<{
    id: string;
    name: string;
    year: number;
    coverUrl: string;
  }>;
  bio?: string;
  monthlyListeners: number;
}

function Artist() {
  const { id } = useParams<{ id: string }>();
  const { setQueue } = usePlayer();
  const { theme } = useTheme();
  const [artist, setArtist] = useState<ArtistData | null>(null);

  useEffect(() => {
    // Mock artist data - replace with real API call
    const mockArtist: ArtistData = {
      id: id || '1',
      name: 'Luna Rodriguez',
      imageUrl: 'https://images.pexels.com/photos/1644924/pexels-photo-1644924.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      followers: 1250000,
      monthlyListeners: 2800000,
      isFollowed: false,
      bio: 'Luna Rodriguez is a contemporary artist known for her ethereal soundscapes and emotive vocals. With influences ranging from ambient electronica to indie folk, she creates music that transcends traditional genre boundaries.',
      topSongs: [
        {
          id: 'artist-top-1',
          title: 'Midnight Dreams',
          artist: 'Luna Rodriguez',
          album: 'Night Sessions',
          duration: 195,
          url: '/samples/sample-1.mp3',
          coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
          isLiked: false,
          isDownloaded: false,
        },
        {
          id: 'artist-top-2',
          title: 'City Lights',
          artist: 'Luna Rodriguez',
          album: 'Night Sessions',
          duration: 220,
          url: '/samples/sample-2.mp3',
          coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
          isLiked: true,
          isDownloaded: false,
        },
        {
          id: 'artist-top-3',
          title: 'Neon Reflections',
          artist: 'Luna Rodriguez',
          album: 'Night Sessions',
          duration: 180,
          url: '/samples/sample-1.mp3',
          coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
          isLiked: false,
          isDownloaded: true,
        }
      ],
      albums: [
        {
          id: 'album-1',
          name: 'Night Sessions',
          year: 2023,
          coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
        },
        {
          id: 'album-2',
          name: 'Digital Dreams',
          year: 2022,
          coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
        }
      ]
    };
    setArtist(mockArtist);
  }, [id]);

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const handlePlayTop = () => {
    if (artist.topSongs.length > 0) {
      setQueue(artist.topSongs, 0);
    }
  };

  const handleFollowToggle = () => {
    setArtist(prev => prev ? { ...prev, isFollowed: !prev.isFollowed } : null);
  };

  return (
    <div className="min-h-screen">
      {/* Artist Header */}
      <div className={`relative p-8 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-purple-900/50 to-gray-900' 
          : 'bg-gradient-to-b from-purple-100 to-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end space-x-6">
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-48 h-48 rounded-full shadow-2xl object-cover"
            />
            
            <div className="flex-1 space-y-4">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  ARTIST
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mt-2 leading-tight">
                  {artist.name}
                </h1>
                {artist.bio && (
                  <p className={`text-lg mt-4 max-w-2xl ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {artist.bio}
                  </p>
                )}
              </div>
              
              <div className={`flex items-center space-x-6 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span>{formatNumber(artist.monthlyListeners)} monthly listeners</span>
                <span>•</span>
                <span>{formatNumber(artist.followers)} followers</span>
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
              onClick={handlePlayTop}
              disabled={artist.topSongs.length === 0}
              className="p-4 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-full transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed"
            >
              <Play className="w-6 h-6" />
            </button>

            <button
              onClick={handleFollowToggle}
              className={`px-6 py-2 border rounded-full font-medium transition-colors ${
                artist.isFollowed
                  ? 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                  : 'border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white'
              }`}
            >
              {artist.isFollowed ? (
                <>
                  <UserCheck className="w-4 h-4 inline-block mr-2" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 inline-block mr-2" />
                  Follow
                </>
              )}
            </button>

            <button
              className={`p-3 rounded-full transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Popular Songs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Popular</h2>
            <SongList 
              songs={artist.topSongs.slice(0, 5)} 
              showArtist={false} 
              showAddToPlaylist 
            />
          </div>

          {/* Albums */}
          {artist.albums.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {artist.albums.map((album) => (
                  <div
                    key={album.id}
                    className={`group cursor-pointer p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 hover:bg-gray-700' 
                        : 'bg-white hover:bg-gray-50'
                    } shadow-sm hover:shadow-md`}
                  >
                    <div className="relative">
                      <img
                        src={album.coverUrl}
                        alt={album.name}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button className="absolute bottom-2 right-2 p-3 bg-purple-500 text-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-purple-600 hover:scale-110">
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="mt-3">
                      <h3 className="font-semibold truncate">{album.name}</h3>
                      <p className={`text-sm mt-1 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {album.year} • Album
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Artist;