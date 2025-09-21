import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Music, User, Disc3 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import SearchBar from '../components/Search/SearchBar';
import SongList from '../components/Playlist/SongList';
import ArtistCard, { Artist } from '../components/Artist/ArtistCard';
import { Song } from '../contexts/PlayerContext';
import { searchSongs, searchArtists, getGenres } from '../services/api';

type TabType = 'all' | 'songs' | 'artists' | 'playlists';

function Search() {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [artistResults, setArtistResults] = useState<Artist[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (error) {
        console.error('Error loading genres:', error);
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setQuery(queryParam);
      performSearch(queryParam);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const [songs, artists] = await Promise.all([
        searchSongs(searchQuery),
        searchArtists(searchQuery)
      ]);
      
      setSearchResults(songs);
      setArtistResults(artists);
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setSearchParams(searchQuery ? { q: searchQuery } : {});
  };

  const handleResults = (results: Song[]) => {
    setSearchResults(results);
  };

  const tabs = [
    { id: 'all' as TabType, label: 'All', icon: Music },
    { id: 'songs' as TabType, label: 'Songs', icon: Music },
    { id: 'artists' as TabType, label: 'Artists', icon: User },
  ];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      );
    }

    if (!query) {
      return (
        <div>
          <h2 className="text-xl font-bold mb-6">Browse genres</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {genres.map((genre, index) => {
              const colors = [
                'bg-gradient-to-br from-purple-500 to-purple-700',
                'bg-gradient-to-br from-blue-500 to-blue-700',
                'bg-gradient-to-br from-green-500 to-green-700',
                'bg-gradient-to-br from-red-500 to-red-700',
                'bg-gradient-to-br from-yellow-500 to-yellow-700',
                'bg-gradient-to-br from-pink-500 to-pink-700',
                'bg-gradient-to-br from-indigo-500 to-indigo-700',
                'bg-gradient-to-br from-teal-500 to-teal-700',
              ];
              
              return (
                <button
                  key={genre}
                  onClick={() => handleSearch(genre)}
                  className={`${colors[index % colors.length]} text-white p-6 rounded-lg hover:scale-105 transition-transform duration-200 text-left`}
                >
                  <h3 className="font-bold text-lg capitalize">{genre}</h3>
                  <Disc3 className="w-8 h-8 mt-2 opacity-80" />
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    const hasResults = searchResults.length > 0 || artistResults.length > 0;

    if (!hasResults) {
      return (
        <div className="text-center py-12">
          <Music className={`w-16 h-16 mx-auto mb-4 ${
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Try searching for something else
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case 'all':
        return (
          <div className="space-y-8">
            {searchResults.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Top results</h2>
                <SongList songs={searchResults.slice(0, 5)} showAddToPlaylist />
              </div>
            )}
            
            {artistResults.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Artists</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {artistResults.slice(0, 6).map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'songs':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Songs • {searchResults.length} results
            </h2>
            <SongList songs={searchResults} showAddToPlaylist />
          </div>
        );
      
      case 'artists':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Artists • {artistResults.length} results
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {artistResults.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} onResults={handleResults} />
        </div>

        {/* Search Tabs */}
        {query && (
          <div className="flex space-x-6 mb-6 border-b border-gray-200 dark:border-gray-700">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 pb-3 transition-colors ${
                  activeTab === id
                    ? 'text-purple-500 border-b-2 border-purple-500'
                    : theme === 'dark' 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}

export default Search;