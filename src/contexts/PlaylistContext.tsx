import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Song } from './PlayerContext';

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  coverUrl: string;
  createdAt: string;
  isPublic: boolean;
}

interface PlaylistState {
  playlists: Playlist[];
  currentPlaylist: Playlist | null;
}

interface PlaylistContextType extends PlaylistState {
  createPlaylist: (name: string, description: string) => Promise<void>;
  updatePlaylist: (id: string, updates: Partial<Playlist>) => void;
  deletePlaylist: (id: string) => void;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  setCurrentPlaylist: (playlist: Playlist | null) => void;
  getPlaylistById: (id: string) => Playlist | undefined;
}

type PlaylistAction = 
  | { type: 'SET_PLAYLISTS'; payload: Playlist[] }
  | { type: 'ADD_PLAYLIST'; payload: Playlist }
  | { type: 'UPDATE_PLAYLIST'; payload: { id: string; updates: Partial<Playlist> } }
  | { type: 'DELETE_PLAYLIST'; payload: string }
  | { type: 'ADD_SONG_TO_PLAYLIST'; payload: { playlistId: string; song: Song } }
  | { type: 'REMOVE_SONG_FROM_PLAYLIST'; payload: { playlistId: string; songId: string } }
  | { type: 'SET_CURRENT_PLAYLIST'; payload: Playlist | null };

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

const playlistReducer = (state: PlaylistState, action: PlaylistAction): PlaylistState => {
  switch (action.type) {
    case 'SET_PLAYLISTS':
      return { ...state, playlists: action.payload };
    case 'ADD_PLAYLIST':
      return { ...state, playlists: [...state.playlists, action.payload] };
    case 'UPDATE_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map(playlist =>
          playlist.id === action.payload.id 
            ? { ...playlist, ...action.payload.updates }
            : playlist
        )
      };
    case 'DELETE_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.filter(playlist => playlist.id !== action.payload),
        currentPlaylist: state.currentPlaylist?.id === action.payload ? null : state.currentPlaylist
      };
    case 'ADD_SONG_TO_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map(playlist =>
          playlist.id === action.payload.playlistId
            ? { ...playlist, songs: [...playlist.songs, action.payload.song] }
            : playlist
        )
      };
    case 'REMOVE_SONG_FROM_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map(playlist =>
          playlist.id === action.payload.playlistId
            ? { ...playlist, songs: playlist.songs.filter(song => song.id !== action.payload.songId) }
            : playlist
        )
      };
    case 'SET_CURRENT_PLAYLIST':
      return { ...state, currentPlaylist: action.payload };
    default:
      return state;
  }
};

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(playlistReducer, {
    playlists: [],
    currentPlaylist: null,
  });

  useEffect(() => {
    // Load playlists from localStorage
    const savedPlaylists = localStorage.getItem('music-app-playlists');
    if (savedPlaylists) {
      dispatch({ type: 'SET_PLAYLISTS', payload: JSON.parse(savedPlaylists) });
    }
  }, []);

  useEffect(() => {
    // Save playlists to localStorage whenever they change
    localStorage.setItem('music-app-playlists', JSON.stringify(state.playlists));
  }, [state.playlists]);

  const createPlaylist = async (name: string, description: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      description,
      songs: [],
      coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      createdAt: new Date().toISOString(),
      isPublic: false,
    };

    dispatch({ type: 'ADD_PLAYLIST', payload: newPlaylist });
  };

  const updatePlaylist = (id: string, updates: Partial<Playlist>) => {
    dispatch({ type: 'UPDATE_PLAYLIST', payload: { id, updates } });
  };

  const deletePlaylist = (id: string) => {
    dispatch({ type: 'DELETE_PLAYLIST', payload: id });
  };

  const addSongToPlaylist = (playlistId: string, song: Song) => {
    dispatch({ type: 'ADD_SONG_TO_PLAYLIST', payload: { playlistId, song } });
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    dispatch({ type: 'REMOVE_SONG_FROM_PLAYLIST', payload: { playlistId, songId } });
  };

  const setCurrentPlaylist = (playlist: Playlist | null) => {
    dispatch({ type: 'SET_CURRENT_PLAYLIST', payload: playlist });
  };

  const getPlaylistById = (id: string) => {
    return state.playlists.find(playlist => playlist.id === id);
  };

  return (
    <PlaylistContext.Provider value={{
      ...state,
      createPlaylist,
      updatePlaylist,
      deletePlaylist,
      addSongToPlaylist,
      removeSongFromPlaylist,
      setCurrentPlaylist,
      getPlaylistById,
    }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};