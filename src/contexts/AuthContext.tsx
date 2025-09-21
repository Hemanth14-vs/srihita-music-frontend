import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: User | null };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_ERROR':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('music-app-user');
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_USER':
      return {
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('music-app-user');
    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    // Mock login - replace with real API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: 'https://images.pexels.com/photos/1644924/pexels-photo-1644924.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      };
      
      localStorage.setItem('music-app-user', JSON.stringify(mockUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR' });
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    // Mock signup - replace with real API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        avatar: 'https://images.pexels.com/photos/1644924/pexels-photo-1644924.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      };
      
      localStorage.setItem('music-app-user', JSON.stringify(mockUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR' });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};