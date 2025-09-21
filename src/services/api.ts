/**
 * API service layer for Music Streaming Platform
 * This acts as an adapter that can be easily switched from mock to real API
 */

import { Song } from '../contexts/PlayerContext';
import { Playlist } from '../contexts/PlaylistContext';
import { Artist } from '../components/Artist/ArtistCard';
import { API_BASE_URL } from './config';

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch featured playlists from the API
 */
export async function getFeaturedPlaylists(): Promise<Playlist[]> {
  await delay(300);
  
  try {
    const response = await fetch(`${API_BASE_URL}/playlists?featured=true`);
    if (!response.ok) throw new Error('Failed to fetch featured playlists');
    return await response.json();
  } catch (error) {
    console.warn('Using mock data for featured playlists:', error);
    // Return mock data as fallback
    return [
      {
        id: 'featured-1',
        name: 'Today\'s Top Hits',
        description: 'The most played songs right now',
        songs: [],
        coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
        createdAt: new Date().toISOString(),
        isPublic: true,
      },
      {
        id: 'featured-2',
        name: 'Chill Vibes',
        description: 'Relax and unwind with these mellow tracks',
        songs: [],
        coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
        createdAt: new Date().toISOString(),
        isPublic: true,
      }
    ];
  }
}

/**
 * Search for songs by query
 */
export async function searchSongs(query: string): Promise<Song[]> {
  await delay(400);
  
  try {
    const response = await fetch(`${API_BASE_URL}/songs?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search songs');
    const data = await response.json();
    return data.map((song: any) => ({
      ...song,
      isLiked: false,
      isDownloaded: false,
    }));
  } catch (error) {
    console.warn('Using mock data for song search:', error);
    // Return mock search results
    return [
      {
        id: `search-1-${Date.now()}`,
        title: `${query} - Song 1`,
        artist: 'Featured Artist',
        album: 'Search Results',
        duration: 180,
        url: '/samples/sample-1.mp3',
        coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
        isLiked: false,
        isDownloaded: false,
      },
      {
        id: `search-2-${Date.now()}`,
        title: `${query} - Song 2`,
        artist: 'Another Artist',
        album: 'Search Results',
        duration: 200,
        url: '/samples/sample-2.mp3',
        coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
        isLiked: false,
        isDownloaded: false,
      }
    ];
  }
}

/**
 * Search for artists by query
 */
export async function searchArtists(query: string): Promise<Artist[]> {
  await delay(350);
  
  try {
    const response = await fetch(`${API_BASE_URL}/artists?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search artists');
    return await response.json();
  } catch (error) {
    console.warn('Using mock data for artist search:', error);
    // Return mock artist results
    return [
      {
        id: `artist-1-${Date.now()}`,
        name: `${query} Artist`,
        imageUrl: 'https://images.pexels.com/photos/1644924/pexels-photo-1644924.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
        followers: Math.floor(Math.random() * 1000000),
        isFollowed: false,
      }
    ];
  }
}

/**
 * Get search suggestions based on query
 */
export async function getSuggestions(query: string): Promise<string[]> {
  await delay(200);
  
  try {
    const response = await fetch(`${API_BASE_URL}/suggestions?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to get suggestions');
    return await response.json();
  } catch (error) {
    console.warn('Using mock suggestions:', error);
    // Return mock suggestions
    const mockSuggestions = [
      `${query} song`,
      `${query} artist`,
      `${query} album`,
      `${query} remix`,
      `best ${query} songs`,
    ];
    return mockSuggestions.slice(0, 5);
  }
}

/**
 * Get artist details by ID
 */
export async function getArtist(id: string): Promise<Artist & { topSongs: Song[]; albums: any[] }> {
  await delay(300);
  
  try {
    const response = await fetch(`${API_BASE_URL}/artists/${id}`);
    if (!response.ok) throw new Error('Failed to get artist');
    return await response.json();
  } catch (error) {
    console.warn('Using mock data for artist:', error);
    // Return mock artist data
    return {
      id,
      name: 'Mock Artist',
      imageUrl: 'https://images.pexels.com/photos/1644924/pexels-photo-1644924.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      followers: 500000,
      isFollowed: false,
      topSongs: [
        {
          id: 'top-1',
          title: 'Popular Song 1',
          artist: 'Mock Artist',
          album: 'Greatest Hits',
          duration: 210,
          url: '/samples/sample-1.mp3',
          coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
          isLiked: false,
          isDownloaded: false,
        }
      ],
      albums: [
        {
          id: 'album-1',
          name: 'Greatest Hits',
          year: 2023,
          coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
        }
      ]
    };
  }
}

/**
 * Toggle follow status for an artist
 */
export async function toggleFollowArtist(id: string): Promise<boolean> {
  await delay(200);
  
  try {
    const response = await fetch(`${API_BASE_URL}/artists/${id}/follow`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to toggle follow');
    const data = await response.json();
    return data.isFollowed;
  } catch (error) {
    console.warn('Using mock follow toggle:', error);
    // Return mock toggle result
    return Math.random() > 0.5;
  }
}

/**
 * Get top artists
 */
export async function getTopArtists(): Promise<Artist[]> {
  await delay(250);
  
  try {
    const response = await fetch(`${API_BASE_URL}/artists/top`);
    if (!response.ok) throw new Error('Failed to get top artists');
    return await response.json();
  } catch (error) {
    console.warn('Using mock data for top artists:', error);
    // Return mock top artists
    return [
      {
        id: 'artist-1',
        name: 'Luna Rodriguez',
        imageUrl: 'https://images.pexels.com/photos/1644924/pexels-photo-1644924.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
        followers: 1200000,
        isFollowed: false,
      },
      {
        id: 'artist-2',
        name: 'Jazz Collective',
        imageUrl: 'https://images.pexels.com/photos/1644944/pexels-photo-1644944.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
        followers: 850000,
        isFollowed: false,
      }
    ];
  }
}

/**
 * Get recently played songs
 */
export async function getRecentlyPlayed(): Promise<Song[]> {
  await delay(200);
  
  try {
    const response = await fetch(`${API_BASE_URL}/me/recent`);
    if (!response.ok) throw new Error('Failed to get recently played');
    return await response.json();
  } catch (error) {
    console.warn('Using mock data for recently played:', error);
    // Return mock recently played songs
    return [
      {
        id: 'recent-1',
        title: 'Midnight Dreams',
        artist: 'Luna Rodriguez',
        album: 'Night Sessions',
        duration: 195,
        url: '/samples/sample-1.mp3',
        coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
        isLiked: true,
        isDownloaded: false,
      },
      {
        id: 'recent-2',
        title: 'Urban Flow',
        artist: 'Beat Masters',
        album: 'City Sounds',
        duration: 180,
        url: '/samples/sample-2.mp3',
        coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
        isLiked: false,
        isDownloaded: true,
      }
    ];
  }
}

/**
 * Get available genres
 */
export async function getGenres(): Promise<string[]> {
  await delay(150);
  
  try {
    const response = await fetch(`${API_BASE_URL}/genres`);
    if (!response.ok) throw new Error('Failed to get genres');
    return await response.json();
  } catch (error) {
    console.warn('Using mock genres:', error);
    // Return mock genres
    return [
      'pop', 'rock', 'hip-hop', 'jazz', 'classical', 'electronic',
      'country', 'r&b', 'indie', 'folk', 'blues', 'reggae'
    ];
  }
}