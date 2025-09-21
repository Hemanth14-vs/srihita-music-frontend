import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../SearchBar';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock the API functions
jest.mock('../../../services/api', () => ({
  searchSongs: jest.fn(() => Promise.resolve([])),
  getSuggestions: jest.fn(() => Promise.resolve(['suggestion 1', 'suggestion 2'])),
}));

const mockOnSearch = jest.fn();
const mockOnResults = jest.fn();

const MockedSearchBar = () => (
  <BrowserRouter>
    <ThemeProvider>
      <SearchBar onSearch={mockOnSearch} onResults={mockOnResults} />
    </ThemeProvider>
  </BrowserRouter>
);

describe('SearchBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search input', () => {
    render(<MockedSearchBar />);
    
    const searchInput = screen.getByPlaceholderText(/search for songs, artists, or albums/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('handles user input', async () => {
    const user = userEvent.setup();
    render(<MockedSearchBar />);
    
    const searchInput = screen.getByPlaceholderText(/search for songs, artists, or albums/i);
    
    await user.type(searchInput, 'test query');
    
    expect(searchInput).toHaveValue('test query');
  });

  test('shows clear button when input has value', async () => {
    const user = userEvent.setup();
    render(<MockedSearchBar />);
    
    const searchInput = screen.getByPlaceholderText(/search for songs, artists, or albums/i);
    
    await user.type(searchInput, 'test');
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  test('clears search when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<MockedSearchBar />);
    
    const searchInput = screen.getByPlaceholderText(/search for songs, artists, or albums/i);
    
    await user.type(searchInput, 'test');
    
    await waitFor(() => {
      const clearButton = screen.getByRole('button');
      expect(clearButton).toBeInTheDocument();
    });
    
    const clearButton = screen.getByRole('button');
    await user.click(clearButton);
    
    expect(searchInput).toHaveValue('');
  });

  test('submits search on form submission', async () => {
    const user = userEvent.setup();
    render(<MockedSearchBar />);
    
    const searchInput = screen.getByPlaceholderText(/search for songs, artists, or albums/i);
    
    await user.type(searchInput, 'test query');
    await user.keyboard('{Enter}');
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query');
    });
  });
});