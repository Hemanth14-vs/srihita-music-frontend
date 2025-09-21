import React, { useState } from 'react';
import { Play, Pause, Heart, Download, MoreHorizontal, Plus } from 'lucide-react';
import { Song } from '../../contexts/PlayerContext';
import { usePlayer } from '../../contexts/PlayerContext';
import { useTheme } from '../../contexts/ThemeContext';
import { formatTime } from '../../utils/formatters';
import AddToPlaylistModal from './AddToPlaylistModal';

interface SongListProps {
  songs: Song[];
  showArtist?: boolean;
  showAlbum?: boolean;
  showAddToPlaylist?: boolean;
  onRemoveSong?: (songId: string) => void;
}

function SongList({ 
  songs, 
  showArtist = true, 
  showAlbum = false, 
  showAddToPlaylist = false,
  onRemoveSong 
}: SongListProps) {
  const { currentSong, isPlaying, play, pause, toggleLike, setQueue } = usePlayer();
  const { theme } = useTheme();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleSongClick = (song: Song, index: number) => {
    if (currentSong?.id === song.id) {
      isPlaying ? pause() : play();
    } else {
      setQueue(songs, index);
    }
  };

  const handleAddToPlaylist = (song: Song) => {
    setSelectedSong(song);
    setShowPlaylistModal(true);
  };

  if (songs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          No songs found
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-1">
        {songs.map((song, index) => {
          const isCurrentSong = currentSong?.id === song.id;
          const isCurrentlyPlaying = isCurrentSong && isPlaying;

          return (
            <div
              key={`${song.id}-${index}`}
              className={`group flex items-center space-x-4 p-3 rounded-lg transition-colors cursor-pointer ${
                isCurrentSong
                  ? theme === 'dark' 
                    ? 'bg-purple-500/20' 
                    : 'bg-purple-100'
                  : theme === 'dark' 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-gray-100'
              }`}
              onClick={() => handleSongClick(song, index)}
            >
              {/* Play/Pause Icon */}
              <div className="flex-shrink-0 w-10 flex justify-center">
                {isCurrentlyPlaying ? (
                  <Pause className="w-4 h-4 text-purple-500" />
                ) : (
                  <Play className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isCurrentSong ? 'text-purple-500' : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`} />
                )}
              </div>

              {/* Song Cover */}
              <img
                src={song.coverUrl}
                alt={song.title}
                className="w-12 h-12 rounded object-cover flex-shrink-0"
              />

              {/* Song Details */}
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium truncate ${
                  isCurrentSong ? 'text-purple-500' : ''
                }`}>
                  {song.title}
                </h4>
                <p className={`text-sm truncate ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {showArtist && song.artist}
                  {showArtist && showAlbum && ' • '}
                  {showAlbum && song.album}
                </p>
              </div>

              {/* Duration */}
              <div className="flex-shrink-0">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {formatTime(song.duration)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song.id);
                  }}
                  className={`p-2 rounded-full transition-colors ${
                    song.isLiked 
                      ? 'text-red-500 hover:text-red-600' 
                      : theme === 'dark' 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label={song.isLiked ? 'Unlike song' : 'Like song'}
                >
                  <Heart className={`w-4 h-4 ${song.isLiked ? 'fill-current' : ''}`} />
                </button>

                <button
                  className={`p-2 rounded-full transition-colors ${
                    song.isDownloaded 
                      ? 'text-green-500' 
                      : theme === 'dark' 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="Download song"
                >
                  <Download className="w-4 h-4" />
                </button>

                {showAddToPlaylist && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToPlaylist(song);
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      theme === 'dark' 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-label="Add to playlist"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}

                <button
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="More options"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showPlaylistModal && selectedSong && (
        <AddToPlaylistModal
          song={selectedSong}
          onClose={() => {
            setShowPlaylistModal(false);
            setSelectedSong(null);
          }}
        />
      )}
    </>
  );
}

export default SongList;