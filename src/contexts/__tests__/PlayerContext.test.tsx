import React from 'react';
import { render, act, renderHook } from '@testing-library/react';
import { PlayerProvider, usePlayer } from '../PlayerContext';

describe('PlayerContext', () => {
  test('provides initial state', () => {
    const { result } = renderHook(() => usePlayer(), {
      wrapper: PlayerProvider,
    });

    expect(result.current.currentSong).toBeNull();
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.currentTime).toBe(0);
    expect(result.current.volume).toBe(1);
  });

  test('throws error when used outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      renderHook(() => usePlayer());
    }).toThrow('usePlayer must be used within a PlayerProvider');
    
    spy.mockRestore();
  });

  test('updates volume correctly', () => {
    const { result } = renderHook(() => usePlayer(), {
      wrapper: PlayerProvider,
    });

    act(() => {
      result.current.setVolume(0.5);
    });

    expect(result.current.volume).toBe(0.5);
  });

  test('toggles shuffle mode', () => {
    const { result } = renderHook(() => usePlayer(), {
      wrapper: PlayerProvider,
    });

    expect(result.current.isShuffled).toBe(false);

    act(() => {
      result.current.toggleShuffle();
    });

    expect(result.current.isShuffled).toBe(true);
  });

  test('cycles through repeat modes', () => {
    const { result } = renderHook(() => usePlayer(), {
      wrapper: PlayerProvider,
    });

    expect(result.current.repeatMode).toBe('none');

    act(() => {
      result.current.toggleRepeat();
    });

    expect(result.current.repeatMode).toBe('all');

    act(() => {
      result.current.toggleRepeat();
    });

    expect(result.current.repeatMode).toBe('one');

    act(() => {
      result.current.toggleRepeat();
    });

    expect(result.current.repeatMode).toBe('none');
  });
});