import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';
import { useTheme } from '../contexts/ThemeContext';
import SongList from '../components/Playlist/SongList';
import { Song } from '../contexts/PlayerContext';
import { formatTime } from '../utils/formatters';

interface Album {
  id: string;
  name: string;
  artist: string;
  year: number;
  coverUrl: string;
  songs: Song[];
  description?: string;
}

function Album() {
  const { id } = useParams<{ id: string }>();
  const { currentSong, isPlaying, setQueue, play, pause } = usePlayer();
  const { theme } = useTheme();
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Mock album data - replace with real API call
    const mockAlbum: Album = {
      id: id || '1',
      name: 'Night Sessions',
      artist: 'Luna Rodriguez',
      year: 2023,
      coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      description: 'A collection of late-night melodies and ambient soundscapes.',
      songs: [
        {
          id: 'album-song-1',
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
          id: 'album-song-2',
          title: 'City Lights',
          artist: 'Luna Rodriguez',
          album: 'Night Sessions',
          duration: 220,
          url: '/samples/sample-2.mp3',
          coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
          isLiked: false,
          isDownloaded: false,
        },
        {
          id: 'album-song-3',
          title: 'Neon Reflections',
          artist: 'Luna Rodriguez',
          album: 'Night Sessions',
          duration: 180,
          url: '/samples/sample-1.mp3',
          coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
          isLiked: false,
          isDownloaded: false,
        }
      ]
    };
    setAlbum(mockAlbum);
  }, [id]);

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const totalDuration = album.songs.reduce((acc, song) => acc + song.duration, 0);
  const isCurrentAlbum = album.songs.some(song => song.id === currentSong?.id);

  const handlePlayPause = () => {
    if (album.songs.length === 0) return;

    if (isCurrentAlbum && currentSong) {
      isPlaying ? pause() : play();
    } else {
      setQueue(album.songs, 0);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Album Header */}
      <div className={`relative p-8 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-purple-900/50 to-gray-900' 
          : 'bg-gradient-to-b from-purple-100 to-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end space-x-6">
            <img
              src={album.coverUrl}
              alt={album.name}
              className="w-48 h-48 rounded-lg shadow-2xl object-cover"
            />
            
            <div className="flex-1 space-y-4">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  ALBUM
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mt-2 leading-tight">
                  {album.name}
                </h1>
                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-xl font-semibold">{album.artist}</span>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    • {album.year}
                  </span>
                </div>
                {album.description && (
                  <p className={`text-lg mt-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {album.description}
                  </p>
                )}
              </div>
              
              <div className={`flex items-center space-x-2 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span>{album.songs.length} songs</span>
                <span>•</span>
                <span>{formatTime(totalDuration)}</span>
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
              disabled={album.songs.length === 0}
              className="p-4 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-full transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed"
            >
              {isCurrentAlbum && isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-full transition-colors ${
                isLiked 
                  ? 'text-red-500 hover:text-red-600' 
                  : theme === 'dark' 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
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

          {/* Songs List */}
          <div className="space-y-4">
            <SongList songs={album.songs} showArtist={false} showAlbum={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Album;