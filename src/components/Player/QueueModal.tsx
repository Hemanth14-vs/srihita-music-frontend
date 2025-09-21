import React from 'react';
import { X, Play, MoreHorizontal } from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';
import { useTheme } from '../../contexts/ThemeContext';
import { formatTime } from '../../utils/formatters';

interface QueueModalProps {
  onClose: () => void;
}

function QueueModal({ onClose }: QueueModalProps) {
  const { queue, currentIndex, currentSong, play, removeSongFromQueue } = usePlayer();
  const { theme } = useTheme();

  const handleSongClick = (index: number) => {
    if (queue[index]) {
      play(queue[index]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`w-full max-w-md max-h-96 mx-4 rounded-lg shadow-xl ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Queue</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-80">
          {queue.length === 0 ? (
            <div className="p-8 text-center">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                No songs in queue
              </p>
            </div>
          ) : (
            <div className="p-2">
              {queue.map((song, index) => (
                <div
                  key={`${song.id}-${index}`}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                    currentSong?.id === song.id && index === currentIndex
                      ? 'bg-purple-500/20 border border-purple-500/30'
                      : theme === 'dark' 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleSongClick(index)}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    {currentSong?.id === song.id && index === currentIndex && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium truncate ${
                      currentSong?.id === song.id && index === currentIndex
                        ? 'text-purple-400'
                        : ''
                    }`}>
                      {song.title}
                    </h4>
                    <p className={`text-xs truncate ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {song.artist}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {formatTime(song.duration)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSongFromQueue(index);
                      }}
                      className={`p-1 rounded transition-colors ${
                        theme === 'dark' 
                          ? 'hover:bg-gray-600 text-gray-400' 
                          : 'hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QueueModal;