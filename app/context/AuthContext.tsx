'use client';
import React, { createContext, useState } from 'react';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  phone: string;
}

interface AuthState {
  loading: boolean;
  data: string | null;
  error: User | null;
}

const AuthenticationContext = <AuthState>({
  loading: false,
  data: null,
  error: null
});

function AuthContext({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState({
    loading: false,
    data: null,
    error: null
  });
  return (
    <AuthenticationContext.Provider value={authState}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthContext;
