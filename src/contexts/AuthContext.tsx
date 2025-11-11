'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { config } from '@/lib/config';

type AuthContextType = AuthState & {
  login: (email: string, name: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    jwtToken: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const loadAuthState = () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
          const user = JSON.parse(userStr);
          setAuthState({
            user,
            jwtToken: token,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadAuthState();
  }, []);

  const login = async (email: string, name: string) => {
    try {
      if (config.isDevMode) {
        // Mock login for development
        const mockUser: User = {
          id: `user_${Date.now()}`,
          name,
          email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=A875D6&color=fff`,
        };

        const mockToken = `mock_jwt_${Date.now()}_${Math.random().toString(36).substring(2)}`;

        // Store in localStorage
        localStorage.setItem('jwt_token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));

        setAuthState({
          user: mockUser,
          jwtToken: mockToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // TODO: Implement actual Google OAuth flow
        throw new Error('Production authentication not yet implemented');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      jwtToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

