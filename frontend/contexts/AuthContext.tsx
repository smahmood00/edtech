"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for authentication token on mount
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout, isLoading }}>
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