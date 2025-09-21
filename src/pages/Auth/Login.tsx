import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Eye, EyeOff, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isLoading } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className={`p-8 rounded-2xl shadow-xl ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Music className="w-12 h-12 text-purple-500" />
            </div>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Sign in to your account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className={`mt-6 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <p className="text-sm font-medium mb-2">Demo Credentials:</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Email: demo@example.com<br />
              Password: demo123
            </p>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-500 hover:text-purple-400 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;