import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('bookshare_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('bookshare_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await apiService.login(email, password);
      
      // Store auth token
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }
      
      setUser(response.user);
      localStorage.setItem('bookshare_user', JSON.stringify(response.user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await apiService.signup(name, email, password);
      
      // Store auth token
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }
      
      setUser(response.user);
      localStorage.setItem('bookshare_user', JSON.stringify(response.user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Signup failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('bookshare_user');
      localStorage.removeItem('auth_token');
    }
  };

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };
};