import React, { createContext, useContext, useReducer, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
}

interface ThemeContextType extends ThemeState {
  toggleTheme: () => void;
}

type ThemeAction = { type: 'TOGGLE_THEME' } | { type: 'SET_THEME'; payload: Theme };

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('music-app-theme', newTheme);
      return { theme: newTheme };
    case 'SET_THEME':
      return { theme: action.payload };
    default:
      return state;
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: 'dark' as Theme,
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('music-app-theme') as Theme;
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }
  }, []);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <ThemeContext.Provider value={{ ...state, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};