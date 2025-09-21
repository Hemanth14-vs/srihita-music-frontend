import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Heart,
  Download,
  Repeat,
  Shuffle,
  MoreHorizontal,
  List
} from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';
import { useTheme } from '../../contexts/ThemeContext';
import { formatTime } from '../../utils/formatters';
import QueueModal from './QueueModal';

function Player() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isShuffled,
    repeatMode,
    play,
    pause,
    seek,
    setVolume,
    nextSong,
    prevSong,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
  } = usePlayer();
  
  const { theme } = useTheme();
  const [isMuted, setIsMuted] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);

  if (!currentSong) {
    return null;
  }

  const handlePlayPause = () => {
    isPlaying ? pause() : play();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seek(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMute = () => {
    if (isMuted) {
      setVolume(0.5);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <div className={`fixed bottom-0 left-0 right-0 z-40 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900/95 backdrop-blur-sm border-gray-800' 
          : 'bg-white/95 backdrop-blur-sm border-gray-200'
      } border-t`}>
        <div className="max-w-full mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Song Info */}
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium truncate">{currentSong.title}</h4>
                <p className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentSong.artist}
                </p>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={() => toggleLike(currentSong.id)}
                  className={`p-2 rounded-full transition-colors ${
                    currentSong.isLiked 
                      ? 'text-red-500 hover:text-red-600' 
                      : theme === 'dark' 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label={currentSong.isLiked ? 'Unlike song' : 'Like song'}
                >
                  <Heart className={`w-4 h-4 ${currentSong.isLiked ? 'fill-current' : ''}`} />
                </button>
                <button
                  className={`p-2 rounded-full transition-colors ${
                    currentSong.isDownloaded 
                      ? 'text-green-500' 
                      : theme === 'dark' 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="Download song"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleShuffle}
                  className={`p-2 rounded-full transition-colors ${
                    isShuffled 
                      ? 'text-purple-500' 
                      : theme === 'dark' 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="Toggle shuffle"
                >
                  <Shuffle className="w-4 h-4" />
                </button>
                
                <button
                  onClick={prevSong}
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  aria-label="Previous song"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handlePlayPause}
                  className="p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={nextSong}
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  aria-label="Next song"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
                
                <button
                  onClick={toggleRepeat}
                  className={`p-2 rounded-full transition-colors ${
                    repeatMode !== 'none' 
                      ? 'text-purple-500' 
                      : theme === 'dark' 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label={`Repeat: ${repeatMode}`}
                >
                  <Repeat className="w-4 h-4" />
                  {repeatMode === 'one' && (
                    <span className="absolute -top-1 -right-1 text-xs">1</span>
                  )}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center space-x-2 w-full">
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formatTime(currentTime)}
                </span>
                <div className="flex-1">
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${progress}%, ${theme === 'dark' ? '#374151' : '#D1D5DB'} ${progress}%, ${theme === 'dark' ? '#374151' : '#D1D5DB'} 100%)`
                    }}
                    aria-label="Seek"
                  />
                </div>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Volume & Queue */}
            <div className="flex items-center space-x-4 flex-1 justify-end">
              <button
                onClick={() => setShowQueueModal(true)}
                className={`p-2 rounded-full transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Show queue"
              >
                <List className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleMute}
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showQueueModal && (
        <QueueModal onClose={() => setShowQueueModal(false)} />
      )}
    </>
  );
}

export default Player;