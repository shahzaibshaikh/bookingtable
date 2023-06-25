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

interface State {
  loading: boolean;
  data: string | null;
  error: User | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

const AuthenticationContext = createContext<AuthState>({
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
