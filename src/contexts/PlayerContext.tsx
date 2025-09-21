import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
  coverUrl: string;
  isDownloaded?: boolean;
  isLiked?: boolean;
}

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Song[];
  currentIndex: number;
  isShuffled: boolean;
  repeatMode: 'none' | 'one' | 'all';
  isLoading: boolean;
}

interface PlayerContextType extends PlayerState {
  play: (song?: Song) => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  addToQueue: (song: Song) => void;
  setQueue: (songs: Song[], startIndex?: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: (songId: string) => void;
  removeSongFromQueue: (index: number) => void;
}

type PlayerAction = 
  | { type: 'SET_CURRENT_SONG'; payload: Song }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_QUEUE'; payload: Song[] }
  | { type: 'SET_CURRENT_INDEX'; payload: number }
  | { type: 'ADD_TO_QUEUE'; payload: Song }
  | { type: 'TOGGLE_SHUFFLE' }
  | { type: 'TOGGLE_REPEAT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_LIKE'; payload: string }
  | { type: 'REMOVE_FROM_QUEUE'; payload: number };

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case 'SET_CURRENT_SONG':
      return { ...state, currentSong: action.payload };
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'SET_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_QUEUE':
      return { ...state, queue: action.payload };
    case 'SET_CURRENT_INDEX':
      return { ...state, currentIndex: action.payload };
    case 'ADD_TO_QUEUE':
      return { ...state, queue: [...state.queue, action.payload] };
    case 'TOGGLE_SHUFFLE':
      return { ...state, isShuffled: !state.isShuffled };
    case 'TOGGLE_REPEAT':
      const nextMode = state.repeatMode === 'none' ? 'all' : 
                      state.repeatMode === 'all' ? 'one' : 'none';
      return { ...state, repeatMode: nextMode };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'TOGGLE_LIKE':
      return {
        ...state,
        queue: state.queue.map(song =>
          song.id === action.payload ? { ...song, isLiked: !song.isLiked } : song
        ),
        currentSong: state.currentSong?.id === action.payload 
          ? { ...state.currentSong, isLiked: !state.currentSong.isLiked }
          : state.currentSong
      };
    case 'REMOVE_FROM_QUEUE':
      const newQueue = state.queue.filter((_, index) => index !== action.payload);
      return {
        ...state,
        queue: newQueue,
        currentIndex: action.payload < state.currentIndex ? state.currentIndex - 1 : state.currentIndex
      };
    default:
      return state;
  }
};

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  
  const [state, dispatch] = useReducer(playerReducer, {
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    queue: [],
    currentIndex: 0,
    isShuffled: false,
    repeatMode: 'none',
    isLoading: false,
  });

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => dispatch({ type: 'SET_TIME', payload: audio.currentTime });
    const updateDuration = () => dispatch({ type: 'SET_DURATION', payload: audio.duration });
    const handleEnded = () => {
      if (state.repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSong();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [state.repeatMode]);

  const play = async (song?: Song) => {
    const audio = audioRef.current;
    
    if (song) {
      dispatch({ type: 'SET_CURRENT_SONG', payload: song });
      dispatch({ type: 'SET_LOADING', payload: true });
      
      audio.src = song.url;
      try {
        await audio.play();
        dispatch({ type: 'SET_PLAYING', payload: true });
      } catch (error) {
        console.error('Error playing audio:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else if (state.currentSong) {
      await audio.play();
      dispatch({ type: 'SET_PLAYING', payload: true });
    }
  };

  const pause = () => {
    audioRef.current.pause();
    dispatch({ type: 'SET_PLAYING', payload: false });
  };

  const seek = (time: number) => {
    audioRef.current.currentTime = time;
    dispatch({ type: 'SET_TIME', payload: time });
  };

  const setVolume = (volume: number) => {
    audioRef.current.volume = volume;
    dispatch({ type: 'SET_VOLUME', payload: volume });
    localStorage.setItem('music-app-volume', volume.toString());
  };

  const nextSong = () => {
    if (state.queue.length === 0) return;
    
    let nextIndex;
    if (state.isShuffled) {
      nextIndex = Math.floor(Math.random() * state.queue.length);
    } else {
      nextIndex = (state.currentIndex + 1) % state.queue.length;
    }
    
    dispatch({ type: 'SET_CURRENT_INDEX', payload: nextIndex });
    play(state.queue[nextIndex]);
  };

  const prevSong = () => {
    if (state.queue.length === 0) return;
    
    const prevIndex = state.currentIndex === 0 
      ? state.queue.length - 1 
      : state.currentIndex - 1;
    
    dispatch({ type: 'SET_CURRENT_INDEX', payload: prevIndex });
    play(state.queue[prevIndex]);
  };

  const addToQueue = (song: Song) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: song });
  };

  const setQueue = (songs: Song[], startIndex = 0) => {
    dispatch({ type: 'SET_QUEUE', payload: songs });
    dispatch({ type: 'SET_CURRENT_INDEX', payload: startIndex });
    if (songs.length > 0) {
      play(songs[startIndex]);
    }
  };

  const toggleShuffle = () => {
    dispatch({ type: 'TOGGLE_SHUFFLE' });
  };

  const toggleRepeat = () => {
    dispatch({ type: 'TOGGLE_REPEAT' });
  };

  const toggleLike = (songId: string) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: songId });
    // Persist to localStorage
    const likedSongs = JSON.parse(localStorage.getItem('music-app-liked') || '[]');
    const isLiked = likedSongs.includes(songId);
    
    if (isLiked) {
      const filtered = likedSongs.filter((id: string) => id !== songId);
      localStorage.setItem('music-app-liked', JSON.stringify(filtered));
    } else {
      localStorage.setItem('music-app-liked', JSON.stringify([...likedSongs, songId]));
    }
  };

  const removeSongFromQueue = (index: number) => {
    dispatch({ type: 'REMOVE_FROM_QUEUE', payload: index });
  };

  // Load saved volume on mount
  useEffect(() => {
    const savedVolume = localStorage.getItem('music-app-volume');
    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }
  }, []);

  return (
    <PlayerContext.Provider value={{
      ...state,
      play,
      pause,
      seek,
      setVolume,
      nextSong,
      prevSong,
      addToQueue,
      setQueue,
      toggleShuffle,
      toggleRepeat,
      toggleLike,
      removeSongFromQueue,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};