import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { searchSongs, getSuggestions } from '../../services/api';
import { Song } from '../../contexts/PlayerContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onResults: (results: Song[]) => void;
}

function SearchBar({ onSearch, onResults }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const loadSuggestions = async () => {
      if (query.length > 2) {
        try {
          const suggestions = await getSuggestions(query);
          setSuggestions(suggestions);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error loading suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounce = setTimeout(loadSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchSongs(searchQuery);
      onResults(results);
      onSearch(searchQuery);
      setShowSuggestions(false);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onResults([]);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-300'
        } border rounded-lg shadow-sm`}>
          <div className="absolute left-3 flex items-center pointer-events-none">
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500" />
            ) : (
              <Search className={`w-4 h-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
            )}
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search for songs, artists, or albums..."
            className={`w-full pl-10 pr-10 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              theme === 'dark' 
                ? 'bg-gray-800 text-white placeholder-gray-400' 
                : 'bg-white text-gray-900 placeholder-gray-500'
            }`}
          />
          
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className={`absolute right-3 p-1 rounded-full transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg border z-50 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-4 py-3 transition-colors ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              } ${index === 0 ? 'rounded-t-lg' : ''} ${
                index === suggestions.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <Search className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <span>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;