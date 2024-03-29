import { AuthenticationContext } from '@/app/context/AuthContext';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { useContext } from 'react';

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(AuthenticationContext);

  const signin = async (
    { email, password }: { email: string; password: string },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true
    });
    try {
      const response = await axios.post('http://localhost:3002/api/auth/login', {
        email,
        password
      });
      setAuthState({
        data: response.data,
        error: null,
        loading: false
      });
      setCookie('jwt', response.data.token);
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.error,
        loading: false
      });
    }
  };
  const signup = async (
    {
      email,
      password,
      firstname,
      lastname,
      city,
      phone
    }: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true
    });
    try {
      const response = await axios.post('http://localhost:3002/api/auth/register', {
        email,
        password,
        firstname,
        lastname,
        city,
        phone
      });
      setAuthState({
        data: response.data,
        error: null,
        loading: false
      });
      setCookie('jwt', response.data.token);
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.error,
        loading: false
      });
    }
  };

  return { signin, signup };
};

export default useAuth;
