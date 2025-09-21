import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import Navbar from './components/Layout/Navbar';
import Player from './components/Player/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Playlist from './pages/Playlist';
import Album from './pages/Album';
import Artist from './pages/Artist';
import Settings from './pages/Settings';
import CreatePlaylist from './pages/CreatePlaylist';
import NotFound from './pages/NotFound';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="flex flex-col h-screen">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/album/:id" element={<Album />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/create-playlist" element={<CreatePlaylist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Player />
      </div>
    </div>
  );
}

export default App;