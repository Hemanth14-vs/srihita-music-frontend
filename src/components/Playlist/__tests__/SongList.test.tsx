import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SongList from '../SongList';
import { PlayerProvider } from '../../../contexts/PlayerContext';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { PlaylistProvider } from '../../../contexts/PlaylistContext';
import { Song } from '../../../contexts/PlayerContext';

const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Test Song 1',
    artist: 'Test Artist 1',
    album: 'Test Album 1',
    duration: 180,
    url: '/test1.mp3',
    coverUrl: '/cover1.jpg',
    isLiked: false,
    isDownloaded: false,
  },
  {
    id: '2',
    title: 'Test Song 2',
    artist: 'Test Artist 2',
    album: 'Test Album 2',
    duration: 200,
    url: '/test2.mp3',
    coverUrl: '/cover2.jpg',
    isLiked: true,
    isDownloaded: false,
  },
];

const MockedSongList = ({ songs = mockSongs }) => (
  <BrowserRouter>
    <ThemeProvider>
      <PlaylistProvider>
        <PlayerProvider>
          <SongList songs={songs} />
        </PlayerProvider>
      </PlaylistProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('SongList Component', () => {
  test('renders list of songs', () => {
    render(<MockedSongList />);
    
    expect(screen.getByText('Test Song 1')).toBeInTheDocument();
    expect(screen.getByText('Test Song 2')).toBeInTheDocument();
    expect(screen.getByText('Test Artist 1')).toBeInTheDocument();
    expect(screen.getByText('Test Artist 2')).toBeInTheDocument();
  });

  test('shows empty state when no songs', () => {
    render(<MockedSongList songs={[]} />);
    
    expect(screen.getByText('No songs found')).toBeInTheDocument();
  });

  test('displays song durations', () => {
    render(<MockedSongList />);
    
    expect(screen.getByText('3:00')).toBeInTheDocument(); // 180 seconds
    expect(screen.getByText('3:20')).toBeInTheDocument(); // 200 seconds
  });

  test('shows like status correctly', () => {
    render(<MockedSongList />);
    
    const heartButtons = screen.getAllByLabelText(/like song|unlike song/i);
    expect(heartButtons).toHaveLength(2);
  });

  test('handles song click', () => {
    render(<MockedSongList />);
    
    const firstSong = screen.getByText('Test Song 1').closest('div');
    fireEvent.click(firstSong!);
    
    // Test would verify that the song starts playing
    // This requires mocking the player context
  });
});