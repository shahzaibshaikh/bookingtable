'use client';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { createContext, useEffect, useState } from 'react';

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
  data: User | null;
  error: string | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {}
});

function AuthContext({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null
  });
  const fetchUser = async () => {
    setAuthState({
      data: null,
      error: null,
      loading: true
    });
    try {
      const jwt = getCookie('jwt');
      if (!jwt) {
        setAuthState({
          data: null,
          error: null,
          loading: false
        });
      }
      const response = await axios.get('http://localhost:3002/api/auth/me', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

      setAuthState({
        data: response.data,
        error: null,
        loading: false
      });
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.error,
        loading: false
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthContext;
