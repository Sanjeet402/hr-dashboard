'use client';

import React, { createContext, useContext, useState } from 'react';

type User = { username: string } | null;

type AuthContextType = {
  user: User;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  function login(username: string, password: string) {
    // simple hardcoded check
    if (username === 'admin' && password === 'password123') {
      setUser({ username });
      return true;
    } else {
      alert('Invalid username or password');
      return false;
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
