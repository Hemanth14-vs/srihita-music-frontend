import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, TrendingUp, Clock, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { usePlaylist } from '../contexts/PlaylistContext';
import { usePlayer } from '../contexts/PlayerContext';
import PlaylistCard from '../components/Playlist/PlaylistCard';
import ArtistCard, { Artist } from '../components/Artist/ArtistCard';
import { Song } from '../contexts/PlayerContext';
import { getFeaturedPlaylists, getTopArtists, getRecentlyPlayed } from '../services/api';

function Home() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { playlists } = usePlaylist();
  const { setQueue } = usePlayer();
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [featured, artists, recent] = await Promise.all([
          getFeaturedPlaylists(),
          getTopArtists(),
          getRecentlyPlayed()
        ]);
        
        setFeaturedPlaylists(featured);
        setTopArtists(artists);
        setRecentlyPlayed(recent);
      } catch (error) {
        console.error('Error loading home data:', error);
      }
    };

    loadHomeData();
  }, []);

  const handlePlayRecent = (song: Song, index: number) => {
    setQueue(recentlyPlayed, index);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {user ? `${getGreeting()}, ${user.name}` : 'Welcome to MusicStream'}
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover new music and enjoy your favorites
          </p>
        </div>

        {/* Quick Access Grid */}
        {recentlyPlayed.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              Recently Played
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentlyPlayed.slice(0, 6).map((song, index) => (
                <button
                  key={song.id}
                  onClick={() => handlePlayRecent(song, index)}
                  className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'dark' 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-50'
                  } shadow-sm hover:shadow-md group`}
                >
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold truncate">{song.title}</h3>
                    <p className={`text-sm truncate ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {song.artist}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-6 h-6 text-purple-500" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Your Playlists */}
        {user && playlists.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Heart className="w-6 h-6 mr-2" />
                Your Playlists
              </h2>
              <Link
                to="/create-playlist"
                className="text-purple-500 hover:text-purple-400 font-medium transition-colors"
              >
                Create Playlist
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {playlists.slice(0, 6).map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </div>
        )}

        {/* Featured Playlists */}
        {featuredPlaylists.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2" />
              Featured Playlists
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featuredPlaylists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </div>
        )}

        {/* Top Artists */}
        {topArtists.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Popular Artists</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {topArtists.slice(0, 6).map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </div>
        )}

        {/* Made for You */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Made for You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Mock recommendation cards */}
            {[
              { id: 'discover', name: 'Discover Weekly', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2' },
              { id: 'daily-mix', name: 'Daily Mix 1', image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2' },
              { id: 'release-radar', name: 'Release Radar', image: 'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2' },
            ].map((item) => (
              <div
                key={item.id}
                className={`group block p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50'
                } shadow-sm hover:shadow-md cursor-pointer`}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button className="absolute bottom-2 right-2 p-3 bg-purple-500 text-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-purple-600 hover:scale-110">
                    <Play className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3">
                  <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                  <p className={`text-sm mt-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Curated for you
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;